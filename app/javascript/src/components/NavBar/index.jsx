import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import { Header } from "@bigbinary/neetoui/layouts";
import { NavLink } from "react-router-dom";

const NavBar = () => (
  <div className="border-b-2 py-0 px-5">
    <Header
      actionBlock={
        <Button
          icon={ExternalLink}
          label="Preview"
          style="secondary"
          to="/preview"
        />
      }
      title={
        <div className="flex text-xl">
          <Typography className="px-2 " style="h4">
            Scribble
          </Typography>
          <NavLink
            exact
            activeClassName="text-indigo-700 px-2"
            className="px-2 text-base text-gray-400"
            to="/"
          >
            Articles
          </NavLink>
          <NavLink
            activeClassName="text-indigo-700 px-2"
            className="px-2 text-base text-gray-400"
            to="/Settings"
          >
            Settings
          </NavLink>
        </div>
      }
    />
  </div>
);
export default NavBar;
