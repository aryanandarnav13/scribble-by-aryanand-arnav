import React from "react";

import { Alert } from "neetoui";

const ForcedScheduleDeletionAlert = ({
  isOpen,
  setIsOpen,
  handleForcedEdit,
}) => (
  <Alert
    isOpen={isOpen}
    message="Scheduled update with the same status will be deleted."
    title="Are you sure, you want to continue?"
    type="warning"
    onClose={() => setIsOpen(false)}
    onSubmit={() => handleForcedEdit()}
  />
);

export default ForcedScheduleDeletionAlert;
