import React, { useState, useEffect } from "react";

import { Typography } from "@bigbinary/neetoui";

import redirectionApi from "apis/redirections";

import { Table } from "./Table";

const Redirection = () => {
  const [redirectionDetails, setRedirectionDetails] = useState([]);

  const fetchRedirectionsDetails = async () => {
    try {
      const {
        data: { redirections },
      } = await redirectionApi.list();
      setRedirectionDetails(redirections);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchRedirectionsDetails();
  }, []);

  return (
    <div className="mx-auto mt-8 w-3/6">
      <div>
        <Typography style="h2">Redirections</Typography>
        <Typography className="neeto-ui-text-gray-600 mt-1" style="body1">
          Create and configure redirection rules to send users from old links to
          new links. All redirections are performed with 301 status codes to be
          SEO friendly.
        </Typography>
        <div className="mt-5 bg-indigo-100 py-4">
          <Table
            fetchRedirectionsDetails={fetchRedirectionsDetails}
            redirectionDetails={redirectionDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default Redirection;
