import React, { useState, useEffect } from "react";

import redirectionApi from "apis/redirections";

import { Form } from "./Form";

const EditForm = ({ id, setIsEdit, fetchRedirectionsDetails }) => {
  const [redirection, setRedirection] = useState({});

  const fetchRedirection = async () => {
    try {
      const response = await redirectionApi.show(id);
      setRedirection(response.data);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await redirectionApi.update({ id, payload: redirection });
      setIsEdit(false);
      fetchRedirectionsDetails();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchRedirection();
  }, []);

  return (
    <Form
      handleCheck={handleUpdate}
      redirectionDetails={redirection}
      setRedirectionDetails={setRedirection}
    />
  );
};

export default EditForm;
