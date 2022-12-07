import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { ActionDropdown, Button } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { useHistory, useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import userApi from "apis/users";
import { RestoreArticle as RestoreArticleModal } from "components/Dashboard/Articles/Actions/Restore";
import VersionHistory from "components/Dashboard/Articles/Actions/VersionHistory";
import { ARTICLE_VALIDATION_SCHEMA } from "components/Dashboard/Articles/constants";
import NavBar from "components/NavBar";

const EditArticle = () => {
  const [submitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const { Menu, MenuItem } = ActionDropdown;
  const [articleStatus, setArticleStatus] = useState("drafted");
  const [currentArticleDetails, setCurrentArticleDetails] = useState([]);
  const [articleToBeRestored, setArticleToBeRestored] = useState([]);
  const [articleVersions, setArticleVersions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const [articleVersionDetails, setArticleVersionDetails] = useState({});
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDeletedInfo, setCategoryDeletedInfo] = useState(false);

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

  const fetchArticleDetails = async () => {
    try {
      const response = await articlesApi.show(id);
      setArticleStatus(response.data.status);
      setCurrentArticleDetails(response.data);
      setArticleVersions(response.data.versions);
      logger.info(response.data.versions);
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

  const handleEdit = async values => {
    const { title, body } = values;
    const category_id = values.category.value;
    const payload = {
      title,
      body,
      category_id,
      status: articleStatus,
      user_id: users.id,
      restored_at: null,
    };
    setSubmitted(true);
    try {
      await articlesApi.update(id, payload);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchArticleDetails();
  }, [id]);

  return (
    <div>
      <NavBar articleStatus={currentArticleDetails.status} />
      <div className="m-4 flex h-full w-screen justify-between">
        <div className="mx-auto mt-10 h-full w-1/2">
          <Formik
            enableReinitialize
            initialValues={currentArticleDetails}
            validateOnBlur={submitted}
            validateOnChange={submitted}
            validationSchema={ARTICLE_VALIDATION_SCHEMA}
            onSubmit={handleEdit}
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
                      label={articleStatus === "drafted" ? "Draft" : "Publish"}
                      buttonProps={{
                        disabled:
                          articleStatus === formik.initialValues.status &&
                          !(formik.isValid && formik.dirty),
                        loading: formik.isSubmitting,
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
        <VersionHistory
          articleToBeRestored={articleToBeRestored}
          articleVersionDetails={articleVersionDetails}
          articleVersions={articleVersions}
          categories={categories}
          currentArticleDetails={currentArticleDetails}
          id={id}
          setArticleToBeRestored={setArticleToBeRestored}
          setArticleVersionDetails={setArticleVersionDetails}
          setCategoryDeletedInfo={setCategoryDeletedInfo}
          setCategoryTitle={setCategoryTitle}
          setShowModal={setShowModal}
        />
      </div>
      <RestoreArticleModal
        articleToBeRestored={articleToBeRestored}
        articleVersionDetails={articleVersionDetails}
        categoryDeletedInfo={categoryDeletedInfo}
        categoryTitle={categoryTitle}
        currentArticleDetails={currentArticleDetails}
        id={id}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
};

export default EditArticle;
