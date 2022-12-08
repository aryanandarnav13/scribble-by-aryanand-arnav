import React from "react";

import { ExternalLink } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Header } from "neetoui/layouts";
import { NavLink } from "react-router-dom";

const NavBar = ({ articleStatus }) => (
  <div className="border-b-2 py-0 px-5">
    <Header
      actionBlock={
        <div className="flex items-center justify-end">
          {articleStatus &&
            (articleStatus === "drafted" ? (
              <Typography
                className="neeto-ui-rounded neeto-ui-bg-pastel-yellow neeto-ui-text-warning-500 mr-4 py-1 px-3"
                style="h5"
              >
                Draft
              </Typography>
            ) : (
              <Typography
                className="neeto-ui-rounded neeto-ui-bg-success-500 neeto-ui-text-white mr-4 py-1 px-3"
                style="h5"
              >
                Published
              </Typography>
            ))}
          <Button
            icon={ExternalLink}
            label="Preview"
            style="secondary"
            to="/preview"
          />
        </div>
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
          <NavLink
            activeClassName="text-indigo-700 px-2"
            className="px-2 text-base text-gray-400"
            to="/analytics"
          >
            Analytics
          </NavLink>
        </div>
      }
    />
  </div>
);
export default NavBar;
