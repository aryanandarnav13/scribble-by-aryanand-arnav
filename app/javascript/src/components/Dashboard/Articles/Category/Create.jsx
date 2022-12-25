import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import { Check } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import categoriesApi from "apis/categories";
import {
  CATEGORY_INITIAL_VALUES,
  CATEGORY_VALIDATION_SCHEMA,
} from "components/Dashboard/Articles/constants";

const Create = ({ fetchCategoriesList }) => {
  const [submitted, setSubmitted] = useState(false);

  const { mutate: createCategory } = useMutation(
    async values => {
      values = {
        ...values,
      };

      return await categoriesApi.create(values);
    },
    {
      onSuccess: () => {
        fetchCategoriesList();
        setSubmitted(true);
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  return (
    <Formik
      initialValues={CATEGORY_INITIAL_VALUES}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={CATEGORY_VALIDATION_SCHEMA}
      onSubmit={createCategory}
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
