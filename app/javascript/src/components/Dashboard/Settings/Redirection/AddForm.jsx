import React from "react";

import { Form } from "./Form";

const AddForm = ({ setAddRedirection, fetchRedirectionsDetails }) => {
  const redirection = {
    frompath: "/",
    topath: "/",
  };

  return (
    <Form
      fetchRedirectionsDetails={fetchRedirectionsDetails}
      redirectionDetails={redirection}
      setAddRedirection={setAddRedirection}
    />
  );
};
export default AddForm;
