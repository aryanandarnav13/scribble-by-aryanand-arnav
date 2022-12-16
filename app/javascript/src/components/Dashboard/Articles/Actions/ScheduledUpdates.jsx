import React, { useState } from "react";

import { Delete } from "neetoicons";
import { Typography, Button, Tooltip, Alert } from "neetoui";

import articleSchedulesApi from "apis/articleSchedules";

const ScheduledUpdates = ({
  scheduledUpdates = [],
  refetch,
  setRefetch,
  articleStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteSchedule = id => {
    if (
      scheduledUpdates.length === 2 &&
      scheduledUpdates[0].status !== articleStatus &&
      scheduledUpdates[0].id === id
    ) {
      setIsOpen(true);
    } else {
      articleSchedulesApi.destroy(id);
      setRefetch(!refetch);
    }
  };

  return (
    <div className="border mb-6 h-full space-y-2 border-indigo-200 py-4 px-4">
      <Typography style="h4">Future Updates</Typography>
      <div className="space-y-2">
        {scheduledUpdates.map(update => (
          <div
            className="border flex items-center space-x-5 border-indigo-100 p-1"
            key={update.id}
          >
            <Typography className=" text-indigo-600" style="h6">
              Scheduled at:
            </Typography>
            <Typography className="text-gray-500" style="h6">
              {update.schedule_at}
            </Typography>
            <Typography className=" text-indigo-600" style="h6">
              Status:
            </Typography>
            <Typography className="text-gray-500" style="h6">
              {update.status === "drafted" ? "Draft" : "Publish"}
            </Typography>
            <Tooltip
              content="Click to delete the scheduled update."
              position="bottom"
            >
              <Button
                className="text-xs"
                icon={Delete}
                style="text"
                onClick={() => handleDeleteSchedule(update.id)}
              />
            </Tooltip>
          </div>
        ))}
      </div>
      <Alert
        isOpen={isOpen}
        message="This will delete both the scheduled updates. As on deletion of only this scheduled update, there will be no use of the other scheduled update."
        title="Are you sure you want to continue?"
        onClose={() => setIsOpen(false)}
        onSubmit={() => {
          articleSchedulesApi.destroy(scheduledUpdates[0].id);
          articleSchedulesApi.destroy(scheduledUpdates[1].id);
          setRefetch(!refetch);
          setIsOpen(false);
        }}
      />
    </div>
  );
};
export default ScheduledUpdates;
