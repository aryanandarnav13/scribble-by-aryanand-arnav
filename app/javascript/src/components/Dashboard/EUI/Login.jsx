import React from "react";

import { Formik, Form } from "formik";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";
import { setToLocalStorage } from "src/utils/storage";
import * as yup from "yup";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";

import EuiNavBar from "./EuiNavBar";
import Vector from "./Vector.png";

export const Login = ({ siteName }) => {
  const handleSubmit = async values => {
    try {
      const response = await authApi.login({
        login: { password: values.password },
      });
      setToLocalStorage({
        authToken: response.data.authentication_token,
      });
      setAuthHeaders();
      window.location.href = "/preview";
    } catch (error) {
      logger.error(error);
    }
  };
  const schema = yup.object().shape({
    password: yup.string().required("Password Can't be blank"),
  });

  return (
    <div>
      <EuiNavBar siteName={siteName} />
      <Formik
        initialValues={{ password: "" }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={schema}
        onSubmit={values => {
          handleSubmit(values);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="w-400 mx-auto  flex flex-col items-center justify-center ">
              <div className="mt-40 text-left">
                <img className="mx-auto mb-6" src={Vector} />
                <Typography style="h2">
                  {siteName} is password protected!
                </Typography>
                <Typography className="text-left text-gray-600">
                  Enter the password to gain access to {siteName}.
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
