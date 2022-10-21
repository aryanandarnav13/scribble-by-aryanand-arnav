import React from "react";

import EuiBody from "./EuiBody";
import EuiNavBar from "./EuiNavBar";

const Eui = ({ siteName }) => (
  <div>
    <EuiNavBar siteName={siteName} />
    <EuiBody siteName={siteName} />
  </div>
);
export default Eui;
