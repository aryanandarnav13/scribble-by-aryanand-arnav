import React, { useState, useEffect } from "react";

import redirectionApi from "apis/redirections";

import { Form } from "./Form";

const EditForm = ({
  id,
  isEdit,
  setIsEdit,
  fetchRedirectionsDetails,
  setAddRedirection,
}) => {
  const [redirection, setRedirection] = useState({ from: "", to: "" });

  const fetchRedirection = async () => {
    try {
      const response = await redirectionApi.show(id);
      setRedirection(response.data.redirection);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchRedirection();
  }, []);

  return (
    <Form
      fetchRedirectionsDetails={fetchRedirectionsDetails}
      id={id}
      isEdit={isEdit}
      redirectionDetails={redirection}
      setAddRedirection={setAddRedirection}
      setIsEdit={setIsEdit}
    />
  );
};

export default EditForm;
