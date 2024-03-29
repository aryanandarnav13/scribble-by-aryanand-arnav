import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { Edit, Delete } from "neetoicons";
import { Button } from "neetoui";

import redirectionApi from "apis/redirections";

import EditForm from "../EditForm";

const Row = ({ redirection, fetchRedirectionsDetails, setAddRedirection }) => {
  const [isEdit, setIsEdit] = useState(false);

  const { mutate: deleteRedirection } = useMutation(
    async () => await redirectionApi.destroy(redirection.id),
    {
      onSuccess: () => {
        fetchRedirectionsDetails();
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  if (isEdit) {
    return (
      <EditForm
        fetchRedirectionsDetails={fetchRedirectionsDetails}
        id={redirection.id}
        isEdit={isEdit}
        setAddRedirection={setAddRedirection}
        setIsEdit={setIsEdit}
      />
    );
  }

  return (
    <div className="mx-4 flex border-b-8 border-indigo-100 bg-white">
      <div
        className=" mr-3 flex overflow-x-auto p-3"
        style={{ maxWidth: "300px", minWidth: "300px" }}
      >
        {window.location.hostname}:{window.location.port}
        {redirection.from}
      </div>
      <div
        className="mt-2 overflow-x-auto"
        style={{ maxWidth: "280px", minWidth: "280px" }}
      >
        {window.location.hostname}:{window.location.port}
        {redirection.to}
      </div>
      <div className="mt-1 ml-4 pr-2">
        <Button
          icon={Delete}
          style="text"
          onClick={() => deleteRedirection()}
        />
        <Button icon={Edit} style="text" onClick={() => setIsEdit(true)} />
      </div>
    </div>
  );
};

export default Row;
