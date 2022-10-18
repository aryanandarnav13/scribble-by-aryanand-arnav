import React, { useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui";

import Row from "./Row";

import AddForm from "../AddForm";
import { TABLE_HEADER } from "../constants";

export const Table = ({ redirectionDetails, fetchRedirectionsDetails }) => {
  const [addRedirection, setAddRedirection] = useState(false);

  return (
    <table className="w-680 mx-auto " style={{ minWidth: "680px" }}>
      <thead>
        <tr className="w-full text-left">
          {TABLE_HEADER.map((title, idx) => (
            <th key={idx}>
              <Typography className="py-3 text-gray-500" style="h5">
                {title}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {redirectionDetails.map((redirection, index) => (
          <Row
            fetchRedirectionsDetails={fetchRedirectionsDetails}
            key={index}
            redirection={redirection}
          />
        ))}
        {addRedirection && (
          <AddForm
            fetchRedirectionsDetails={fetchRedirectionsDetails}
            setAddRedirection={setAddRedirection}
          />
        )}
        <tr>
          <td>
            <Button
              className="mt-2"
              icon={Plus}
              iconPosition="left"
              label="Add new Redirection"
              style="link"
              onClick={() => setAddRedirection(value => !value)}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
