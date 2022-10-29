import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { ActionDropdown, Button } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { useHistory, useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import userApi from "apis/users";
import { ARTICLE_VALIDATION_SCHEMA } from "components/Dashboard/Articles/constants";

import NavBar from "../../../NavBar";

const EditArticle = () => {
  const [submitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const { Menu, MenuItem } = ActionDropdown;
  const [articleStatus, setArticleStatus] = useState("Draft");
  const [articleDetails, setArticleDetails] = useState({});
  const history = useHistory();
  const { slug } = useParams();

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

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await articlesApi.show(slug);
        setArticleDetails(response.data);
      } catch (error) {
        logger.error(error);
      }
    };
    fetchArticleDetails();
  }, [slug]);

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

  const handleEdit = async values => {
    const { title, body } = values;
    const category_id = values.category.value;
    const payload = {
      title,
      body,
      category_id,
      status: articleStatus,
      user_id: users[0].id,
    };
    setSubmitted(true);
    try {
      await articlesApi.update(slug, payload);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="h-1/2 mx-auto mt-8 w-1/2">
        <Formik
          enableReinitialize
          initialValues={articleDetails}
          validateOnBlur={submitted}
          validateOnChange={submitted}
          validationSchema={ARTICLE_VALIDATION_SCHEMA}
          onSubmit={handleEdit}
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

export default EditArticle;
