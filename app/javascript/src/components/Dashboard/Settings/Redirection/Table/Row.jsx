import React, { useState } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";

import redirectionApi from "apis/redirections";

import EditForm from "../EditForm";

const Row = ({ redirection, fetchRedirectionsDetails }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async id => {
    const value = confirm("Press OK to Delete Redirection");
    if (value) {
      try {
        await redirectionApi.destroy(id);
        fetchRedirectionsDetails();
      } catch (error) {
        logger.error(error);
      }
    }
  };

  if (isEdit) {
    return (
      <EditForm
        fetchRedirectionsDetails={fetchRedirectionsDetails}
        id={redirection.id}
        setIsEdit={setIsEdit}
      />
    );
  }

  return (
    <tr className="border-b-8 border-indigo-100 bg-white">
      <td
        className="whitespace-no-wrap mr-3 flex overflow-x-auto p-3 text-left"
        style={{ maxWidth: "300px", minWidth: "300px" }}
      >
        {window.location.hostname}/{window.location.port}/{redirection.frompath}
      </td>
      <td
        className=" overflow-x-auto"
        style={{ maxWidth: "280px", minWidth: "280px" }}
      >
        {window.location.hostname}/{window.location.port}/{redirection.topath}
      </td>
      <td className="pr-2">
        <Button
          icon={Delete}
          style="text"
          onClick={() => handleDelete(redirection.id)}
        />
        <Button icon={Edit} style="text" onClick={() => setIsEdit(true)} />
      </td>
    </tr>
  );
};

export default Row;
