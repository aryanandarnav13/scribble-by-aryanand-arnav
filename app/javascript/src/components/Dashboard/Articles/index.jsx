import React, { useState } from "react";

import { ActionDropdown, Button, Checkbox } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import { filterItems, camelize } from "./constants";
import SideMenu from "./SideMenu";
import Table from "./Table";

import NavBar from "../../NavBar";

const Articles = () => {
  const [searchArticle, setSearchArticle] = useState("");
  const { Menu, MenuItem } = ActionDropdown;
  const [columnFilter, setColumnFilter] = useState(filterItems);
  const [totalDraftCount, setTotalDraftCount] = useState(0);
  const [totalPublishCount, setTotalPublishCount] = useState(0);
  const [filteredDraftCount, setFilteredDraftCount] = useState(0);
  const [filteredPublishCount, setFilteredPublishCount] = useState(0);
  const [articleFilterConstraint, setArticleFilterConstraint] = useState({
    status: "All",
    category: [],
  });

  const handleColumnCheck = e => {
    setColumnFilter({
      ...columnFilter,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div>
      <NavBar />
      <div className="flex">
        <SideMenu
          articleFilterConstraint={articleFilterConstraint}
          setArticleFilterConstraint={setArticleFilterConstraint}
          setTotalDraftCount={setTotalDraftCount}
          setTotalPublishCount={setTotalPublishCount}
          totalDraftCount={totalDraftCount}
          totalPublishCount={totalPublishCount}
        />
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
                    {Object.keys(columnFilter).map((column, idx) => (
                      <MenuItem.Button key={idx}>
                        <Checkbox
                          checked={columnFilter[column]}
                          id={idx}
                          label={camelize(column)}
                          name={column}
                          onChange={handleColumnCheck}
                        />
                      </MenuItem.Button>
                    ))}
                  </Menu>
                </ActionDropdown>
                <Button
                  icon="ri-add-line"
                  label="Add New Article"
                  to="/articles/create"
                />
              </div>
            }
            searchProps={{
              value: searchArticle,
              onChange: e => setSearchArticle(e.target.value),
              placeholder: "Search Article Title",
            }}
          />
          <div className="max-w-7xl px-2 font-bold">
            {filteredDraftCount + filteredPublishCount} Articles
          </div>
          <Table
            articleFilterConstraint={articleFilterConstraint}
            columnFilter={columnFilter}
            searchArticle={searchArticle}
            setFilteredDraftCount={setFilteredDraftCount}
            setFilteredPublishCount={setFilteredPublishCount}
          />
        </Container>
      </div>
    </div>
  );
};
export default Articles;
