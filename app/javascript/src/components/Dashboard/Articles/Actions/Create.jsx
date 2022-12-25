import React, { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import { ActionDropdown, Button } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { assoc, pick, pipe } from "ramda";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import {
  ARTICLE_VALIDATION_SCHEMA,
  ARTICLE_INITIAL_VALUES,
} from "components/Dashboard/Articles/constants";
import NavBar from "components/NavBar";

const Create = () => {
  const [submitted, setSubmitted] = useState(false);
  const { Menu, MenuItem } = ActionDropdown;
  const [articleStatus, setArticleStatus] = useState("drafted");
  const history = useHistory();

  const { data: categories } = useQuery(
    ["fetchCategories"],
    async () => {
      const { data } = await categoriesApi.list();

      return data.categories;
    },
    {
      onError: error => {
        logger.error(error);
      },
    }
  );

  const { mutate: createArticle } = useMutation(
    async values => {
      const payload = pipe(
        assoc("status", articleStatus),
        assoc("category_id", values.category.value),
        pick(["title", "body", "category_id", "status"])
      )(values);

      return await articlesApi.create(payload);
    },
    {
      onSuccess: () => {
        history.push("/");
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  return (
    <div>
      <NavBar />
      <div className="h-1/2 mx-auto mt-8 w-1/2">
        <Formik
          initialValues={ARTICLE_INITIAL_VALUES}
          validationSchema={ARTICLE_VALIDATION_SCHEMA}
          onSubmit={createArticle}
        >
          {formik => (
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
                  options={categories?.map(category => ({
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
                    label={articleStatus === "drafted" ? "Draft" : "Publish"}
                    buttonProps={{
                      disabled: !(formik.isValid && formik.dirty),
                      loading: formik.isSubmitting && submitted,
                      type: "submit",
                    }}
                    onClick={() => {
                      setSubmitted(true);
                    }}
                  >
                    <Menu>
                      <MenuItem.Button
                        onClick={() => {
                          setArticleStatus("drafted");
                        }}
                      >
                        Draft
                      </MenuItem.Button>
                      <MenuItem.Button
                        onClick={() => {
                          setArticleStatus("published");
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
