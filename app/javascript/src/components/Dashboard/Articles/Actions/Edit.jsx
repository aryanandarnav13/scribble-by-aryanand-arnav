import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { ActionDropdown, Button } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { useHistory, useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import articleSchedulesApi from "apis/articleSchedules";
import categoriesApi from "apis/categories";
import { ARTICLE_VALIDATION_SCHEMA } from "components/Dashboard/Articles/constants";
import NavBar from "components/NavBar";

import DateAndTimePickerModal from "./DateAndTimePickerModal";
import ForcedScheduleDeletionAlert from "./ForcedScheduleDeletionAlert";
import { RestoreArticle as RestoreArticleModal } from "./Restore";
import ScheduledUpdates from "./ScheduledUpdates";
import VersionHistory from "./VersionHistory";

const EditArticle = () => {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const { Menu, MenuItem } = ActionDropdown;
  const [articleStatus, setArticleStatus] = useState("drafted");
  const [currentArticleDetails, setCurrentArticleDetails] = useState([]);
  const [articleToBeRestored, setArticleToBeRestored] = useState([]);
  const [articleVersions, setArticleVersions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [articleVersionDetails, setArticleVersionDetails] = useState({});
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDeletedInfo, setCategoryDeletedInfo] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [articleScheduledStatus, setArticleScheduledStatus] = useState("draft");
  const [dateAndTime, setDateAndTime] = useState("");
  const [label, setLabel] = useState("");
  const [scheduledUpdates, setScheduledUpdates] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [isScheduleDeletionAlertOpen, setIsScheduleDeletionAlertOpen] =
    useState(false);

  const { id } = useParams();
  const history = useHistory();

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
      setLabel(response.data.status === "drafted" ? "Draft" : "Publish");
      setCurrentArticleDetails(response.data);
      setArticleVersions(response.data.versions);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchUpdateSchedules = async () => {
    try {
      const res = await articleSchedulesApi.list(id);
      setScheduledUpdates([...res.data.schedules]);
    } catch (err) {
      logger.error(err);
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
      restored_at: null,
    };
    setSubmitted(true);
    if (checkForcedScheduleDeletion()) {
      try {
        await articlesApi.update(id, payload);
        history.push("/");
      } catch (error) {
        logger.error(error);
      }
    } else {
      setIsScheduleDeletionAlertOpen(true);
      setFormValues(values);
    }
  };

  const handleForcedEdit = async () => {
    const { title, body } = formValues;
    const category_id = formValues.category.value;
    const payload = {
      title,
      body,
      category_id,
      status: articleStatus,
      restored_at: null,
    };
    setSubmitted(true);
    try {
      await articlesApi.update(id, payload);
    } catch (error) {
      logger.error(error);
    }
  };

  const checkForcedScheduleDeletion = () => {
    if (
      (scheduledUpdates.filter(update => update.status === "published").length >
        0 &&
        articleStatus === "published") ||
      (scheduledUpdates.filter(update => update.status === "drafted").length >
        0 &&
        articleStatus === "drafted")
    ) {
      return false;
    }

    return true;
  };

  const handleScheduleUpdate = async () => {
    try {
      const d = new Date(`${dateAndTime}`);
      setRefetch(!refetch);
      await articleSchedulesApi.create({
        id,
        payload: {
          status: articleScheduledStatus,
          schedule_at: d.getTime() / 1000,
        },
      });
      setIsScheduleModalOpen(false);
    } catch (err) {
      logger.error(err);
    }
  };

  const isUnpublishLaterButtonActive = () =>
    (articleStatus === "published" &&
      scheduledUpdates.filter(update => update.status === "drafted").length ===
        0) ||
    (articleStatus === "drafted" &&
      scheduledUpdates.filter(update => update.status === "published").length >
        0);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchArticleDetails();
  }, [id]);

  useEffect(() => {
    fetchUpdateSchedules();
  }, [refetch]);

  return (
    <div>
      <NavBar articleStatus={currentArticleDetails.status} />
      <div className="m-4 flex h-full w-screen justify-between">
        <div className="mx-auto mt-10 h-full w-1/2">
          {scheduledUpdates.length > 0 && (
            <ScheduledUpdates
              articleStatus={articleStatus}
              refetch={refetch}
              scheduledUpdates={scheduledUpdates}
              setRefetch={setRefetch}
            />
          )}
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
                      label={label}
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
                            setLabel("Draft");
                          }}
                        >
                          Draft
                        </MenuItem.Button>
                        <MenuItem.Button
                          onClick={() => {
                            setArticleStatus("published");
                            setLabel("Publish");
                          }}
                        >
                          Publish
                        </MenuItem.Button>
                        {scheduledUpdates.length < 2 && (
                          <div>
                            {isUnpublishLaterButtonActive() ? (
                              <MenuItem.Button
                                onClick={() => {
                                  setIsScheduleModalOpen(true);
                                  setArticleScheduledStatus("drafted");
                                  setLabel(
                                    currentArticleDetails.status === "drafted"
                                      ? "Draft"
                                      : "Publish"
                                  );
                                }}
                              >
                                Unpublish Later
                              </MenuItem.Button>
                            ) : (
                              <MenuItem.Button
                                onClick={() => {
                                  setIsScheduleModalOpen(true);
                                  setArticleScheduledStatus("published");
                                  setLabel(
                                    currentArticleDetails.status === "drafted"
                                      ? "Draft"
                                      : "Publish"
                                  );
                                }}
                              >
                                Publish Later
                              </MenuItem.Button>
                            )}
                          </div>
                        )}
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
          setRefetch={setRefetch}
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
        refetch={refetch}
        setRefetch={setRefetch}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <DateAndTimePickerModal
        handleScheduleUpdate={handleScheduleUpdate}
        isScheduleModalOpen={isScheduleModalOpen}
        scheduledUpdates={scheduledUpdates}
        setDateAndTime={setDateAndTime}
        setIsScheduleModalOpen={setIsScheduleModalOpen}
      />
      <ForcedScheduleDeletionAlert
        handleForcedEdit={handleForcedEdit}
        isOpen={isScheduleDeletionAlertOpen}
        setIsOpen={setIsScheduleDeletionAlertOpen}
      />
    </div>
  );
};

export default EditArticle;
