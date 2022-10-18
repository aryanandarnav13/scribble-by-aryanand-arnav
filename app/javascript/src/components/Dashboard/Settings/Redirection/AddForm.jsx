import React, { useState } from "react";

import redirectionApi from "apis/redirections";

import { Form } from "./Form";

const AddForm = ({ setAddRedirection, fetchRedirectionsDetails }) => {
  const [redirection, setRedirection] = useState({
    from: "",
    to: "",
  });

  const handleAdd = async () => {
    try {
      await redirectionApi.create(redirection);
      setAddRedirection(false);
      fetchRedirectionsDetails();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Form
      handleCheck={handleAdd}
      redirectionDetails={redirection}
      setRedirectionDetails={setRedirection}
    />
  );
};
export default AddForm;
