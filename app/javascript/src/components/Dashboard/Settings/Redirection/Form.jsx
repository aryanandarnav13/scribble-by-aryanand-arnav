import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check, Close } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Input } from "neetoui/formik";

import redirectionApi from "apis/redirections";

import { REDIRECTION_VALIDATION_SCHEMA } from "./constants";

export const Form = ({
  id,
  fetchRedirectionsDetails,
  redirectionDetails,
  setAddRedirection,
  isEdit,
  setIsEdit,
}) => {
  const handleSubmit = async values => {
    try {
      if (isEdit) {
        await redirectionApi.update({
          id,
          payload: {
            frompath: values.frompath,
            topath: values.topath,
          },
        }),
          setIsEdit(false);
      } else {
        await redirectionApi.create({
          frompath: values.frompath,
          topath: values.topath,
        });
        setAddRedirection(false);
      }
      fetchRedirectionsDetails();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={redirectionDetails}
      validationSchema={REDIRECTION_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <div className="mx-4 flex border-b-8 border-indigo-100 bg-white">
          <div
            className="whitespace-no-wrap mr-3 flex overflow-y-auto p-2"
            style={{ maxWidth: "300px", minWidth: "300px" }}
          >
            <Typography className="overflow-x-auto p-1" style="body2">
              {window.location.hostname}/{window.location.port.slice(0, -1)}
            </Typography>
            <Input
              className="ml-1"
              name="frompath"
              style={{ width: "160px" }}
            />
          </div>
          <div
            className="whitespace-no-wrap flex overflow-y-auto"
            style={{ maxWidth: "280px", minWidth: "280px" }}
          >
            <Typography className="mt-2 overflow-x-auto p-1" style="body2">
              {window.location.hostname}/{window.location.port.slice(0, -1)}
            </Typography>
            <Input
              className="ml-1 mt-2"
              name="topath"
              style={{ width: "160px" }}
            />
          </div>
          <div className="mt-1 ml-4 pr-2">
            <Button icon={Check} style="text" type="submit" />
            <Button
              icon={Close}
              style="text"
              onClick={() =>
                isEdit ? setIsEdit(false) : setAddRedirection(false)
              }
            />
          </div>
        </div>
      </FormikForm>
    </Formik>
  );
};
