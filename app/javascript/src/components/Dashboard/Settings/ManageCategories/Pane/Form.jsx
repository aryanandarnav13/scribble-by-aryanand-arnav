import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Button, Pane } from "neetoui";
import { Input } from "neetoui/formik";

import categoriesApi from "apis/categories";
import userApi from "apis/users";

// import { NOTES_FORM_VALIDATION_SCHEMA, TAGS, ROLES } from "../constants";

const CategoryForm = ({ onClose, refetch, category, isEdit }) => {
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
      if (isEdit) {
        await categoriesApi.update({
          payload: {
            name: values.name,
            user_id: users.id,
            id: category.id,
          },
        });
      } else {
        await categoriesApi.create({ name: values.name, user_id: users.id });
      }
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={category}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      // validationSchema={NOTES_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-full">
          <Pane.Body className="space-y-6">
            <Input
              required
              className="w-full flex-grow-0"
              label="Category Name"
              name="name"
              placeholder="Enter Category name"
            />
          </Pane.Body>
          <Pane.Footer>
            <Button
              className="mr-3"
              disabled={isSubmitting}
              label={isEdit ? "Update" : "Save Changes"}
              loading={isSubmitting}
              size="large"
              style="primary"
              type="submit"
              onClick={() => setSubmitted(true)}
            />
            <Button
              label="Cancel"
              size="large"
              style="text"
              onClick={() => {
                onClose();
              }}
            />
          </Pane.Footer>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
