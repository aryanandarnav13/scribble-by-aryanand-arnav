import React from "react";

import { Form } from "./Form";

const AddForm = ({ setAddRedirection, fetchRedirectionsDetails }) => {
  const redirection = {
    from: "/",
    to: "/",
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
