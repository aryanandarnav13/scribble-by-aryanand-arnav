import React from "react";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import { Modal, Typography, Button } from "neetoui";

import articleSchedulesApi from "apis/article_schedules";

const DateAndTimePickerModal = ({
  isScheduleModalOpen,
  setIsScheduleModalOpen,
  id,
  setRefetch,
  articleScheduledStatus,
}) => {
  const DATE_AND_TIME_INITIAL_VALUES = { dateAndTime: dayjs().startOf("day") };
  const handleScheduleUpdate = async values => {
    try {
      setRefetch(prevFetch => !prevFetch);
      await articleSchedulesApi.create({
        id,
        payload: {
          status: articleScheduledStatus,
          schedule_at: dayjs(values.dateAndTime).format(),
        },
      });
      setIsScheduleModalOpen(false);
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={DATE_AND_TIME_INITIAL_VALUES}
      onSubmit={handleScheduleUpdate}
    >
      {({ values, setFieldValue }) => (
        <Modal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
        >
          <Modal.Header>
            <Typography style="h4">Schedule an Update</Typography>
            <ErrorMessage name="dateAndTime">
              {msg => <div className="mt-1 text-red-700">{msg}</div>}
            </ErrorMessage>
          </Modal.Header>
          <Modal.Body className="space-y-0">
            <FormikForm className="mt-1 w-full">
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                name="dateAndTime"
                placeholder="Select Date and Time"
                selected={values.dateAndTime}
                disabledDate={current =>
                  current && current < dayjs().startOf("day")
                }
                onChange={str => {
                  setFieldValue("dateAndTime", str);
                }}
              />
              <div className="mt-4 mb-2 flex">
                <Button
                  className="mr-2"
                  label="Schedule"
                  size="small"
                  style="primary"
                  type="submit"
                />
                <Button
                  className="ml-2"
                  label="Cancel"
                  size="small"
                  style="danger"
                  onClick={() => setIsScheduleModalOpen(false)}
                />
              </div>
            </FormikForm>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default DateAndTimePickerModal;
