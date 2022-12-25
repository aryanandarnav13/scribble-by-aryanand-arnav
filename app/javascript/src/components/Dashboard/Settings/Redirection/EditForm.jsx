import React, { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import redirectionApi from "apis/redirections";

import { Form } from "./Form";

const EditForm = ({
  id,
  isEdit,
  setIsEdit,
  fetchRedirectionsDetails,
  setAddRedirection,
}) => {
  const { data: redirection, refetch: fetchRedirection } = useQuery(
    ["redirection", id],
    async () => {
      const response = await redirectionApi.show(id);

      return response.data.redirection;
    },
    {
      onError: error => {
        logger.error(error);
      },
    }
  );

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
