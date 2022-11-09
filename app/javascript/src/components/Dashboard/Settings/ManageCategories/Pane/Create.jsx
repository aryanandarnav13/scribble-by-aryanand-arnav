import React from "react";

import { Pane, Typography } from "neetoui";

import Form from "./Form";

import { CATEGORIES_FORM_INITIAL_FORM_VALUES } from "../constants";

const Create = ({ fetchCategories, showPane, setShowPane }) => {
  const onClose = () => setShowPane(false);

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Add New Category
        </Typography>
      </Pane.Header>
      <Form
        category={CATEGORIES_FORM_INITIAL_FORM_VALUES}
        refetch={fetchCategories}
        onClose={onClose}
      />
    </Pane>
  );
};

export default Create;
