import React from "react";

import { useQuery } from "@tanstack/react-query";
import { PageLoader, Typography } from "neetoui";

import redirectionApi from "apis/redirections";

import { Table } from "./Table";

const Redirection = () => {
  const {
    data: redirectionDetails,
    refetch: fetchRedirectionsDetails,
    isLoading,
  } = useQuery(
    ["redirections"],
    async () => {
      const { data } = await redirectionApi.list();

      return data.redirections;
    },
    {
      onError: error => {
        logger.error(error);
      },
    }
  );

  if (isLoading) {
    return <PageLoader />;
  }

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
