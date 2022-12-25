import React, { useState, useEffect, useRef } from "react";

import { useMutation } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import { Button, Typography, PageLoader } from "neetoui";
import { Input, Checkbox } from "neetoui/formik";
import { assoc } from "ramda";

import siteApi from "apis/sites";

import { siteSchema } from "./constants";

const General = () => {
  const [isPasswordInputDisabled, setIsPasswordInputDisabled] = useState(true);
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [passwordEnableCheck, setPasswordEnableCheck] = useState(false);

  const passwordFocus = useRef(null);

  const { mutate: fetchSiteDetails } = useMutation(
    async () => {
      const response = await siteApi.list();

      return response.data;
    },
    {
      onSuccess: data => {
        setSiteName(data.name);
        setPasswordEnabled(data.password_enabled);
        setPasswordEnableCheck(data.password_enabled);
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  const { mutate: handleSubmit, isLoading } = useMutation(
    async values => {
      const pass = values.password_enabled ? values.password : null;
      const payload = assoc("password", pass, values);

      return await siteApi.update({ payload });
    },
    {
      onSuccess: () => {
        localStorage.setItem("authToken", JSON.stringify(null));
        fetchSiteDetails();
      },
      onError: error => {
        logger.error(error);
      },

      onSettled: () => {
        setIsPasswordInputDisabled(true);
      },
    }
  );

  const handlePasswordProtectionChange = formik => {
    if (passwordEnabled === false) {
      setIsPasswordInputDisabled(false);
    } else {
      setIsPasswordInputDisabled(true);
    }

    setPasswordEnableCheck(previousState => !previousState);

    passwordEnabled === false && formik.setFieldValue("password", "");
  };

  useEffect(() => {
    fetchSiteDetails();
  }, []);

  useEffect(() => {
    if (passwordFocus && passwordFocus.current) {
      passwordFocus?.current.select();
    }
  }, [isPasswordInputDisabled]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="w-400  mx-auto">
      <Formik
        enableReinitialize
        validateOnBlur={false}
        initialValues={{
          name: siteName,
          password: "",
          password_enabled: passwordEnableCheck,
        }}
        validationSchema={siteSchema({
          isPasswordInputDisabled,
          passwordEnableCheck,
          passwordEnabled,
        })}
        onSubmit={values => handleSubmit(values)}
      >
        {formik => (
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
              checked={passwordEnableCheck}
              disabled={!isPasswordInputDisabled}
              label="Password Protection Knowledge base"
              name="password_enabled"
              style={{
                color: "#6366F1",
                borderRadius: "5px",
              }}
              onChange={() => handlePasswordProtectionChange(formik)}
            />
            <div>
              {passwordEnableCheck && (
                <div className="flex gap-3 px-1">
                  <Input
                    className="mt-5"
                    disabled={isPasswordInputDisabled}
                    label="Password"
                    name="password"
                    ref={passwordFocus}
                    type="password"
                    placeholder={
                      isPasswordInputDisabled && passwordEnabled
                        ? "*********"
                        : "Enter Password"
                    }
                  />
                  {passwordEnabled && (
                    <Button
                      className="mt-10 h-8"
                      label="Change Password"
                      size="small"
                      style="secondary"
                      onClick={() => {
                        setIsPasswordInputDisabled(false);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="my-4">
              <Button
                className="bg-indigo-500 "
                label="Save Changes"
                type="submit"
                disabled={
                  passwordEnabled === passwordEnableCheck && !formik.dirty
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
