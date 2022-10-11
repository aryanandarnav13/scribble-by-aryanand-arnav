import React, { useState } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

import categoriesApi from "apis/categories";
import {
  CATEGORY_INITIAL_VALUES,
  CATEGORY_VALIDATION_SCHEMA,
} from "components/Dashboard/Articles/constants";

const Create = ({ fetchCategoriesList }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async values => {
    try {
      await categoriesApi.create(values);
    } catch (err) {
      logger.error(err);
    }
    fetchCategoriesList();
    setSubmitted(true);
  };

  return (
    <Formik
      initialValues={CATEGORY_INITIAL_VALUES}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={CATEGORY_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      <Form>
        <Input
          required
          name="name"
          suffix={<Button icon={Check} style="text" type="submit" />}
          type="text"
        />
      </Form>
    </Formik>
  );
};

export default Create;
