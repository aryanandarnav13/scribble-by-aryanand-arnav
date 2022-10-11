import React from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import { Input, Checkbox } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

const General = ({ name }) => (
  <div className="w-400  mx-auto">
    <Formik
      initialValues={{ name, password: "", isPassword: false }}
      validateOnBlur={false}
    >
      {({ errors, values }) => (
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
          <div />
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

export default General;
