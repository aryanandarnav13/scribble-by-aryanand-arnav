import React, { useState } from "react";

import { ActionDropdown, Button } from "@bigbinary/neetoui";
import { Container, Header } from "@bigbinary/neetoui/layouts";

import SideMenu from "./SideMenu";
import Table from "./Table";

import NavBar from "../../NavBar";

const Articles = () => {
  const [searchArticle, setSearchArticle] = useState("");
  const { Menu, MenuItem } = ActionDropdown;
  const listItems = ["title", "description", "testing"];

  return (
    <div>
      <NavBar />
      <div className="flex">
        <SideMenu />
        <Container>
          <Header
            title=""
            actionBlock={
              <div>
                <ActionDropdown
                  buttonStyle="secondary"
                  className="mr-3"
                  label="Columns"
                >
                  <Menu>
                    {listItems.map((item, idx) => (
                      <MenuItem.Button key={idx}>{item}</MenuItem.Button>
                    ))}
                  </Menu>
                </ActionDropdown>
                <Button
                  icon="ri-add-line"
                  label="Add New Article"
                  to="/article/create"
                />
              </div>
            }
            searchProps={{
              value: searchArticle,
              onChange: e => setSearchArticle(e.target.value),
              placeholder: "Search article title",
            }}
          />
          <div className="max-w-7xl px-2 font-bold">67 Articles</div>
          <Table />
        </Container>
      </div>
    </div>
  );
};
export default Articles;
