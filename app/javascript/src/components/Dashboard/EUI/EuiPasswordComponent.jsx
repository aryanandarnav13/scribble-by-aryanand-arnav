import React from "react";

import { Typography, Button } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";

import EuiNavBar from "./EuiNavBar";
import Vector from "./Vector.png";

export const EuiPasswordComponent = () => {
  const schema = yup.object().shape({
    password: yup.string().required("Password Can't be blank"),
  });

  return (
    <div>
      <EuiNavBar />
      <Formik
        initialValues={{ password: "" }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={schema}
      >
        {({ values }) => (
          <Form>
            <div className="w-400 mx-auto  flex flex-col items-center justify-center ">
              <div className="mt-40 text-left">
                <img className="mx-auto mb-6" src={Vector} />
                <Typography style="h2">
                  Spinkart is password protected!
                </Typography>
                <Typography className="text-left text-gray-600">
                  Enter the password to gain access to Spinkart.
                </Typography>
                <Input
                  className="w-400 mt-6"
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                />
                <Button
                  className="mt-6 bg-indigo-700"
                  label="Continue"
                  type="submit"
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};