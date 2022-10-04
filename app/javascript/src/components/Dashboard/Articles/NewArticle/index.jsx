import React, { useState } from "react";

import { Dropdown, Button } from "@bigbinary/neetoui";
import { Input, Textarea, Select } from "@bigbinary/neetoui/formik";
import { Formik, Form as FormikForm } from "formik";

import {
  CATEGORIES,
  FORM_INITIAL_VALUES,
  VALIDATION_SCHEMA,
} from "components/Dashboard/Articles/constants";

import NavBar from "../../../NavBar";

const { Menu, MenuItem } = Dropdown;
const listCategories = ["Publish", "Save Draft"];

const NewArticle = () => {
  const [dropdownLabel, setDropdownLabel] = useState("Save Draft");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <NavBar />
      <div className="h-1/2 mx-auto mt-8 w-1/2">
        <Formik
          initialValues={FORM_INITIAL_VALUES}
          validateOnBlur={submitted}
          validateOnChange={submitted}
          validationSchema={VALIDATION_SCHEMA}
          // onSubmit={handleSubmit}
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
                  options={CATEGORIES}
                  placeholder="Select a Category"
                />
              </div>
              <Textarea
                required
                className="mt-6 w-full flex-grow-0"
                label="Article Body"
                name="body"
                placeholder="Enter Article"
                rows={10}
              />
              <div className="mt-4 flex items-center">
                <div className="flex">
                  <Button
                    className="mr-px"
                    disabled={isSubmitting}
                    label={dropdownLabel}
                    loading={isSubmitting}
                    size="medium"
                    style="primary"
                    type="submit"
                    onClick={() => setSubmitted(true)}
                  />
                  <Dropdown
                    className="mr-3"
                    disabled={isSubmitting}
                    type="submit"
                    onClick={() => setSubmitted(true)}
                  >
                    <Menu>
                      {listCategories.map((category, idx) => (
                        <MenuItem.Button
                          key={idx}
                          onClick={() => {
                            setDropdownLabel(category);
                          }}
                        >
                          {category}
                        </MenuItem.Button>
                      ))}
                    </Menu>
                  </Dropdown>
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
