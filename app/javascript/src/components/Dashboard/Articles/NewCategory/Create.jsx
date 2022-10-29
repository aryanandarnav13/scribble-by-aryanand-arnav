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
      const {
        data: { users },
      } = await userApi.list();
      setUsers(users);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async values => {
    try {
      values = {
        ...values,
        user_id: users[0].id,
      };
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
