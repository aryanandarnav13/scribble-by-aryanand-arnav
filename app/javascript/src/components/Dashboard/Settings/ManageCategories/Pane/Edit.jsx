import React from "react";

import { Pane, Typography } from "neetoui";

import Form from "./Form";

const EditCategoryPane = ({
  fetchCategories,
  showPane,
  setShowPane,
  isEdit,
  setIsEdit,
  category,
}) => {
  const onClose = () => {
    setShowPane(false);
    setIsEdit(false);
  };

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Edit Category
        </Typography>
      </Pane.Header>
      <Form
        category={category}
        isEdit={isEdit}
        refetch={fetchCategories}
        onClose={onClose}
      />
    </Pane>
  );
};

export default EditCategoryPane;
