import React, { useState, useEffect, useRef } from "react";

import { Formik, Form } from "formik";
import { Button, Typography } from "neetoui";
import { Input, Checkbox } from "neetoui/formik";
import * as yup from "yup";

import siteApi from "apis/sites";

import { PasswordForm } from "./PasswordForm";

const General = () => {
  const [isPasswordInputDisabled, setIsPasswordInputDisabled] = useState(true);
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [siteName, setSiteName] = useState("");
  const passwordFocus = useRef(null);

  const fetchSiteDetails = async () => {
    try {
      const response = await siteApi.list();
      logger.info(response.data);
      setSiteName(response.data.name);
      setPasswordEnabled(response.data.password_enabled);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async values => {
    try {
      const pass = values.password_enabled ? values.password : null;
      await siteApi.update({
        payload: {
          name: values.name,
          password: pass,
          password_enabled: values.password_enabled,
        },
      });
      if (values.password_enabled === true) {
        localStorage.setItem("authToken", JSON.stringify(null));
      }
    } catch (error) {
      logger.error(error);
    } finally {
      setIsPasswordInputDisabled(true);
    }
  };

  useEffect(() => {
    fetchSiteDetails();
  }, []);

  useEffect(() => {
    if (passwordFocus && passwordFocus.current) {
      passwordFocus?.current.select();
    }
  }, [isPasswordInputDisabled]);

  return (
    <div className="w-400  mx-auto">
      <Formik
        enableReinitialize
        validateOnBlur={false}
        initialValues={{
          name: siteName,
          password: "",
          password_enabled: passwordEnabled,
        }}
        validationSchema={yup.object().shape({
          name: yup.string().required("Please Enter a Site name"),
          password: yup
            .string()
            .min(6, "Require atleast 6 character")
            .matches(
              /(?=.*?[0-9])(?=.*?[A-Za-z]).+/,
              "Requires atleast 1 number and letter"
            )
            .when("password_enabled", {
              is: true,
              then: yup.string().required("Please enter password"),
            }),
        })}
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
                label="Site Name"
                name="name"
                placeholder="Enter Site Name"
              />
              <Typography className="text-gray-500" style="body3">
                Customize the site name which is used to show the site name in
              </Typography>
              <Typography className="text-gray-600" style="h6">
                Open Graph Tags
              </Typography>
            </div>
            <Checkbox
              checked={passwordEnabled}
              disabled={!isPasswordInputDisabled}
              label="Password Protection Knowledge base"
              name="password_enabled"
              style={{
                color: "#6366F1",
                borderRadius: "5px",
              }}
              onChange={() => {
                setPasswordEnabled(prevPasswordEnabled => !prevPasswordEnabled);
              }}
            />
            <div>
              {passwordEnabled && (
                <PasswordForm
                  errors={errors}
                  isPasswordInputDisabled={isPasswordInputDisabled}
                  password={values.password}
                  passwordFocus={passwordFocus}
                  setFieldValue={setFieldValue}
                  setIsPasswordInputDisabled={setIsPasswordInputDisabled}
                />
              )}
            </div>
            <div className="my-4">
              <Button
                className="bg-indigo-500 "
                label="Save Changes"
                type="submit"
                disabled={
                  isPasswordInputDisabled === passwordEnabled
                  //  && !(Formik.isValid && Formik.dirty)
                }
              />
              <Button
                className="ml-6"
                label="Cancel"
                style="text"
                type="reset"
                onClick={() => {
                  setIsPasswordInputDisabled(true);
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default General;
