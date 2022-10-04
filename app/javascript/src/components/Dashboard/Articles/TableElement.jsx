import React from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";

export const renderIcon = () => (
  <div className="flex space-x-4">
    <Delete color="#1e1e20" size={24} />
    <Edit color="#1e1e20" size={24} />
  </div>
);
