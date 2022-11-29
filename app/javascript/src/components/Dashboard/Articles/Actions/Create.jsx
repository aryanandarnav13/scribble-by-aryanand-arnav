import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { ActionDropdown, Button } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import userApi from "apis/users";
import {
  ARTICLE_VALIDATION_SCHEMA,
  ARTICLE_INITIAL_VALUES,
} from "components/Dashboard/Articles/constants";
import NavBar from "components/NavBar";

const Create = () => {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const { Menu, MenuItem } = ActionDropdown;
  const [articleStatus, setArticleStatus] = useState("Draft");

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
        title: values.title,
        body: values.body,
        category_id: values.category.value,
        status: articleStatus,
        user_id: users.id,
      };
      await articlesApi.create(values);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchUsers();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="h-1/2 mx-auto mt-8 w-1/2">
        <Formik
          initialValues={ARTICLE_INITIAL_VALUES}
          validateOnBlur={submitted}
          validateOnChange={submitted}
          validationSchema={ARTICLE_VALIDATION_SCHEMA}
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
                  name="category"
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
                    label={articleStatus}
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
                          setArticleStatus("Draft");
                        }}
                      >
                        Draft
                      </MenuItem.Button>
                      <MenuItem.Button
                        onClick={() => {
                          setArticleStatus("Publish");
                        }}
                      >
                        Publish
                      </MenuItem.Button>
                    </Menu>
                  </ActionDropdown>
                </div>
                <Button
                  className="mx-3"
                  label="Cancel"
                  size="medium"
                  style="text"
                  to="/"
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

export default Create;