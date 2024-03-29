import React, { useState, useEffect } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import { ActionDropdown, Button } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { pick, assoc, pipe } from "ramda";
import { useHistory, useParams } from "react-router-dom";

import articleSchedulesApi from "apis/article_schedules";
import articlesApi from "apis/articles";
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
  const [label, setLabel] = useState("");
  const [scheduledUpdates, setScheduledUpdates] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [isScheduleDeletionAlertOpen, setIsScheduleDeletionAlertOpen] =
    useState(false);

  const { id } = useParams();
  const history = useHistory();

  const { data: categories } = useQuery(
    ["fetchCategories"],
    async () => {
      const response = await categoriesApi.list();

      return response.data.categories;
    },
    {
      onError: error => logger.error(error),
    }
  );

  const { mutate: fetchArticleDetails } = useMutation(
    async () => {
      const response = await articlesApi.show(id);

      return response.data;
    },
    {
      onSuccess: data => {
        setArticleStatus(data.status);
        setLabel(data.status === "drafted" ? "Draft" : "Publish");
        setCurrentArticleDetails(data);
        setArticleVersions(data.versions.reverse());
      },
    },
    {
      onError: error => logger.error(error),
    }
  );

  const { mutate: fetchUpdateSchedules } = useMutation(
    async () => {
      const res = await articleSchedulesApi.list(id);

      return res.data.schedules;
    },
    {
      onSuccess: data => setScheduledUpdates(data),
    },
    {
      onError: error => logger.error(error),
    }
  );

  const { mutate: updateArticle } = useMutation(
    async payload => await articlesApi.update(id, payload),
    {
      onSuccess: () => history.push("/"),
    },
    {
      onError: error => logger.error(error),
    }
  );

  const handleEdit = async values => {
    const payload = pipe(
      assoc("category_id", values.category.value),
      assoc("status", articleStatus),
      assoc("restored_at", null),
      pick(["title", "body", "category_id", "status", "restored_at"])
    )(values);

    setSubmitted(true);
    if (!checkForcedScheduleDeletion()) {
      updateArticle(payload);
    } else {
      setIsScheduleDeletionAlertOpen(true);
      setFormValues(values);
    }
  };

  const { mutate: handleForcedEdit } = useMutation(
    async () => {
      const payload = pipe(
        assoc("category_id", formValues.category.value),
        assoc("status", articleStatus),
        assoc("restored_at", null),
        pick(["title", "body", "category_id", "status", "restored_at"])
      )(formValues);

      return await articlesApi.update(id, payload);
    },
    {
      onSuccess: () => {
        setSubmitted(true);
        setIsScheduleDeletionAlertOpen(false);
        setRefetch(prevFetch => !prevFetch);
      },
    },
    {
      onError: error => logger.error(error),
    }
  );

  const checkForcedScheduleDeletion = () => {
    const deletionCondition =
      (scheduledUpdates.filter(update => update.status === "published").length >
        0 &&
        articleStatus === "published") ||
      (scheduledUpdates.filter(update => update.status === "drafted").length >
        0 &&
        articleStatus === "drafted");

    if (deletionCondition) {
      return true;
    }

    return false;
  };

  const isUnpublishLaterButtonActive = () =>
    (articleStatus === "published" &&
      scheduledUpdates.filter(update => update.status === "drafted").length ===
        0) ||
    (articleStatus === "drafted" &&
      scheduledUpdates.filter(update => update.status === "published").length >
        0);

  useEffect(() => {
    fetchArticleDetails();
  }, [id, refetch]);

  useEffect(() => {
    fetchUpdateSchedules();
  }, [id, refetch, articleStatus]);

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
                            <MenuItem.Button
                              onClick={() => {
                                setIsScheduleModalOpen(true);
                                setArticleScheduledStatus(
                                  isUnpublishLaterButtonActive()
                                    ? "drafted"
                                    : "published"
                                );
                                setLabel(
                                  currentArticleDetails.status === "drafted"
                                    ? "Draft"
                                    : "Publish"
                                );
                              }}
                            >
                              {isUnpublishLaterButtonActive()
                                ? "Unpublish Later"
                                : "Publish Later"}
                            </MenuItem.Button>
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
          articleVersionDetails={articleVersionDetails}
          articleVersions={articleVersions}
          categories={categories}
          currentArticleDetails={currentArticleDetails}
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
        refetch={refetch}
        setRefetch={setRefetch}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <DateAndTimePickerModal
        articleScheduledStatus={articleScheduledStatus}
        id={id}
        isScheduleModalOpen={isScheduleModalOpen}
        setIsScheduleModalOpen={setIsScheduleModalOpen}
        setRefetch={setRefetch}
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
