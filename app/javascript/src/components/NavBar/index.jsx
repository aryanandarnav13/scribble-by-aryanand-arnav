import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Header } from "@bigbinary/neetoui/layouts";
import { Button, Typography, Tag } from "neetoui";
import { NavLink } from "react-router-dom";

const NavBar = ({ articleStatus }) => (
  <div className="border-b-2 py-0 px-5">
    <Header
      actionBlock={
        <div className="flex items-center justify-end">
          {articleStatus &&
            (articleStatus === "Draft" ? (
              <Tag
                className="mr-5 bg-yellow-200"
                label="Draft"
                size="large"
                style="outline"
              />
            ) : (
              <Tag
                className=" mr-5 bg-green-300"
                label="Published"
                size="large"
                style="outline"
              />
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
