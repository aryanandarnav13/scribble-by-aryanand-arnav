import React from "react";

import { Typography } from "@bigbinary/neetoui";

const EuiNavBar = ({ siteName }) => (
  <div className="h-15 flex items-center justify-center border-b-2 p-4">
    <Typography className="font-bold">{siteName}</Typography>
  </div>
);
export default EuiNavBar;
