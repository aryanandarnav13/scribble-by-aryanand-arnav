import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";

import NavItem from "./NavItem";

const NavBar = () => (
  <nav className=" border-b-2 bg-white">
    <div className="max-w-7xl mx-auto px-2">
      <div className="flex h-16 justify-between">
        <div className="flex px-2">
          <div className="flex">
            <NavItem name="Scribble" />
            <NavItem name="Articles" path="/" />
            <NavItem name="Settings" path="/" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-4">
          <Button
            icon={ExternalLink}
            label="Preview"
            style="secondary"
            to="/"
          />
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
