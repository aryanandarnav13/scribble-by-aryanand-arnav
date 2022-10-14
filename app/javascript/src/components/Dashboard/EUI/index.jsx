import React from "react";

import EuiBody from "./EuiBody";
import EuiNavBar from "./EuiNavBar";
import { EuiPasswordComponent } from "./EuiPasswordComponent";

const EUI = () => (
  <div>
    <EuiNavBar />
    <div className="flex">
      <EuiBody />
    </div>
    <EuiPasswordComponent />
  </div>
);
export default EUI;
