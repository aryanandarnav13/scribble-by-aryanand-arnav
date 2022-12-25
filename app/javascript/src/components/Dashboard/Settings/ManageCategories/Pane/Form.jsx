import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import { Button, Pane } from "neetoui";
import { Input } from "neetoui/formik";

import categoriesApi from "apis/categories";

import { CATEGORIES_FORM_VALIDATION_SCHEMA } from "../constants";

const CategoryForm = ({ onClose, refetch, category, isEdit }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async values => {
    if (isEdit) {
      handleEdit(values);
    } else {
      handleCreate(values);
    }
  };

  const { mutate: handleEdit } = useMutation(
    async values => {
      const payload = {
        name: values.name,
        id: category.id,
      };

      return await categoriesApi.update({ payload });
    },
    {
      onSuccess: () => {
        refetch();
        onClose();
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  const { mutate: handleCreate } = useMutation(
    async values => await categoriesApi.create({ name: values.name }),
    {
      onSuccess: () => {
        refetch();
        onClose();
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  return (
    <Formik
      enableReinitialize
      initialValues={category}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={CATEGORIES_FORM_VALIDATION_SCHEMA}
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
