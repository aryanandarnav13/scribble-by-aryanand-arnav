import React from "react";

import { Typography } from "neetoui";

const EuiNavBar = ({ siteName, setShowModal }) => (
  <div className="border max-w-7xl sticky top-0 mx-auto flex h-20 bg-white px-4">
    <div
      className="border absolute mt-6 flex w-1/5 border-gray-500 p-2 text-gray-500"
      onClick={() => {
        setShowModal(true);
      }}
    >
      Search for articles here.
    </div>
    <Typography className="m-auto" style="h3">
      {siteName}
    </Typography>
  </div>
);
export default EuiNavBar;
