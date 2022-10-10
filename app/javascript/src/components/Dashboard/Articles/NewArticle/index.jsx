import React, { useState, useEffect } from "react";

import { ActionDropdown, Button } from "@bigbinary/neetoui";
import { Input, Textarea, Select } from "@bigbinary/neetoui/formik";
import { Formik, Form as FormikForm } from "formik";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import { FORM_INITIAL_VALUES } from "components/Dashboard/Articles/constants";

import NavBar from "../../../NavBar";

const NewArticle = () => {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const { Menu, MenuItem } = ActionDropdown;
  const [statusVar, setStatusVar] = useState("Draft");

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async values => {
    try {
      values = {
        ...values,
        category_id: values.category_id.value,
        status: statusVar,
      };
      await articlesApi.create(values);
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="h-1/2 mx-auto mt-8 w-1/2">
        <Formik
          initialValues={FORM_INITIAL_VALUES}
          validateOnBlur={submitted}
          validateOnChange={submitted}
          // validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <FormikForm className="w-full">
              <div className="space-between flex w-full">
                <Input
                  required
                  className="mr-5 w-full"
                  label="Article Title"
                  name="title"
                  placeholder="Enter Article Title"
                />
                <Select
                  isClearable
                  isSearchable
                  required
                  className="w-full flex-grow-0"
                  label="Category"
                  name="category_id"
                  placeholder="Select a Category"
                  options={categories.map(category => ({
                    label: category.name,
                    value: category.id,
                  }))}
                />
              </div>
              <Textarea
                required
                className="mt-6 w-full flex-grow-0"
                label="Article Body"
                name="body"
                placeholder="Enter Article Body"
                rows={10}
              />
              <div className="mt-4 flex items-center">
                <div className="flex">
                  <ActionDropdown
                    label={statusVar}
                    buttonProps={{
                      disabled: isSubmitting,
                      loading: isSubmitting,
                      type: "submit",
                    }}
                    onClick={() => {
                      setSubmitted(true);
                    }}
                  >
                    <Menu>
                      <MenuItem.Button
                        onClick={() => {
                          setStatusVar("Draft");
                        }}
                      >
                        Draft
                      </MenuItem.Button>
                      <MenuItem.Button
                        onClick={() => {
                          setStatusVar("Published");
                        }}
                      >
                        Published
                      </MenuItem.Button>
                    </Menu>
                  </ActionDropdown>
                </div>
                <Button
                  className="mx-3"
                  label="Cancel"
                  size="medium"
                  style="text"
                  type="reset"
                />
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewArticle;
