import React from "react";

import { Typography } from "@bigbinary/neetoui";

const Redirection = () => (
  <div className="mx-auto mt-8 w-3/6">
    <div>
      <Typography style="h2">Redirections</Typography>
      <Typography className="neeto-ui-text-gray-600 mt-1" style="body1">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status codes to be
        SEO friendly.
      </Typography>
    </div>
  </div>
);

export default Redirection;
