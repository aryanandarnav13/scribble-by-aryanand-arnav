import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Check } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import categoriesApi from "apis/categories";
import userApi from "apis/users";
import {
  CATEGORY_INITIAL_VALUES,
  CATEGORY_VALIDATION_SCHEMA,
} from "components/Dashboard/Articles/constants";

const Create = ({ fetchCategoriesList }) => {
  const [submitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await userApi.list();
      setUsers(response.data);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async values => {
    try {
      values = {
        ...values,
        user_id: users.id,
      };
      await categoriesApi.create(values);
    } catch (err) {
      logger.error(err);
    }
    fetchCategoriesList();
    setSubmitted(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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