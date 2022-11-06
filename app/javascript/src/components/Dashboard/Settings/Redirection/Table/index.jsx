import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";

import Row from "./Row";

import AddForm from "../AddForm";
import { TABLE_HEADER } from "../constants";

export const Table = ({ redirectionDetails, fetchRedirectionsDetails }) => {
  const [addRedirection, setAddRedirection] = useState(false);

  return (
    <div className="w-680 mx-auto" style={{ minWidth: "680px" }}>
      <div>
        <div className=" mx-5 flex justify-between border-b-8 border-indigo-100">
          {TABLE_HEADER.map((title, idx) => (
            <div className="m-y-auto" key={idx}>
              <Typography className="py-3  text-gray-500" style="h5">
                {title}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <div>
        {redirectionDetails.map((redirection, index) => (
          <Row
            fetchRedirectionsDetails={fetchRedirectionsDetails}
            key={index}
            redirection={redirection}
            setAddRedirection={setAddRedirection}
          />
        ))}
        {addRedirection && (
          <AddForm
            fetchRedirectionsDetails={fetchRedirectionsDetails}
            setAddRedirection={setAddRedirection}
          />
        )}
        <div>
          <div>
            <Button
              className="mt-2 ml-4"
              icon={Plus}
              iconPosition="left"
              label="Add new Redirection"
              style="link"
              onClick={() => setAddRedirection(value => !value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
