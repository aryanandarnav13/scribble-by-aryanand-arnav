import React from "react";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Warning } from "neetoicons";
import { Modal, Typography, Button, Callout } from "neetoui";

const DateAndTimePickerModal = ({
  isScheduleModalOpen,
  setIsScheduleModalOpen,
  setDateAndTime,
  scheduledUpdates,
  handleScheduleUpdate,
}) => (
  <Modal
    isOpen={isScheduleModalOpen}
    onClose={() => setIsScheduleModalOpen(false)}
  >
    <Modal.Header>
      <Typography style="h4">Schedule an Update</Typography>
    </Modal.Header>
    <Modal.Body className="space-y-0">
      <div className="w-full">
        <div className="mb-2 w-10/12">
          <Callout icon={Warning} style="danger">
            {scheduledUpdates.length < 1
              ? "Please select a date and time in the future."
              : "Please select a date and time after the already scheduled update."}
          </Callout>
        </div>
        <DatePicker
          showTime
          disabledDate={current => current && current < dayjs().startOf("day")}
          format="YYYY-MM-DD HH:mm"
          getPopupContainer={triggerNode => triggerNode.parentNode}
          placeholder="Select Date and Time"
          onChange={str => {
            setDateAndTime(str);
          }}
        />
        <div className="mt-4 flex">
          <Button label="Schedule" onClick={handleScheduleUpdate} />
          <Button
            className="ml-2"
            label="Cancel"
            style="danger"
            onClick={() => setIsScheduleModalOpen(false)}
          />
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer />
  </Modal>
);
export default DateAndTimePickerModal;
