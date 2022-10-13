import React, { useState } from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import { Input, Checkbox } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";

import websiteApi from "apis/websites";

import { PasswordForm } from "./PasswordForm";

const General = ({ name }) => {
  const [passwordValidation, setPasswordValidation] = useState({
    minChar: false,
    letterAndNumber: false,
  });
  const handlePassword = e => {
    const passWord = e.target.value;
    const minChar = passWord.length >= 6;
    const letterAndNumber = !!/(?=.*?[0-9])(?=.*?[A-Za-z]).+/.test(passWord);
    setPasswordValidation({ minChar, letterAndNumber });
  };
  const handleSubmit = async values => {
    try {
      const pass = values.isPassword ? values.password : null;
      await websiteApi.update({
        site: {
          name: values.name,
          password: pass,
        },
      });
    } catch (error) {
      logger.error(error);
    }
  };
  const schema = yup.object().shape({
    name: yup.string().required("Please Enter a Site name"),
    password: yup
      .string()
      .min(6, "Require atleast 6 character")
      .matches(
        /(?=.*?[0-9])(?=.*?[A-Za-z]).+/,
        "Requires atleast 1 number and letter"
      )
      .when("isPassword", {
        is: true,
        then: yup.string().required("Please enter  password"),
      }),
  });

  return (
    <div className="w-400  mx-auto">
      <Formik
        initialValues={{ name, password: "", isPassword: false }}
        validateOnBlur={false}
        validationSchema={schema}
        onSubmit={values => handleSubmit(values)}
      >
        {({ errors, values, setFieldValue }) => (
          <Form className="mt-4">
            <div className="mb-3 border-b-2 pb-5">
              <Typography style="h2">General Settings</Typography>
              <Typography className="text-gray-600" style="body2">
                Configure general attributes of scribble.
              </Typography>
              <Input
                className="mt-5"
                error={errors.name}
                label="Site Name"
                name="name"
                placeholder="Enter Site Name."
                value={values.name}
              />
              <Typography className="text-gray-500" style="body3">
                Customize the site name which is used to show the site name in
              </Typography>
              <Typography className="text-gray-600" style="h6">
                Open Graph Tags
              </Typography>
            </div>
            <Checkbox
              label="Password Protection Knowledge base"
              name="isPassword"
              value={values.isPassword}
              style={{
                color: "#6366F1",
                borderRadius: "5px",
              }}
            />
            <div>
              {values.isPassword && (
                <PasswordForm
                  errors={errors}
                  handlePassword={handlePassword}
                  password={values.password}
                  passwordValidation={passwordValidation}
                  setFieldValue={setFieldValue}
                />
              )}
            </div>
            <div className="my-4">
              <Button
                className="bg-indigo-500 "
                label="Save Changes"
                type="submit"
              />
              <Button className="ml-6" label="Cancel" style="text" to="/" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default General;
