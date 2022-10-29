import React, { useState, useEffect } from "react";

import { ActionDropdown, Button, Checkbox } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import articlesApi from "apis/articles";

import { filterItems, camelize } from "./constants";
import SideMenu from "./SideMenu";
import Table from "./Table";

import NavBar from "../../NavBar";

const Articles = () => {
  const [searchArticle, setSearchArticle] = useState("");
  const { Menu, MenuItem } = ActionDropdown;
  const [columnFilter, setColumnFilter] = useState(filterItems);
  const [draftCount, setDraftCount] = useState(0);
  const [publishCount, setPublishCount] = useState(0);
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
  const fetchCategories = async () => {
    try {
      const {
        data: { draft, publish },
      } = await articlesApi.list();

      setDraftCount(draft);
      setPublishCount(publish);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex">
        <SideMenu
          articleFilterConstraint={articleFilterConstraint}
          setArticleFilterConstraint={setArticleFilterConstraint}
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
            {draftCount + publishCount} Articles
          </div>
          <Table
            articleFilterConstraint={articleFilterConstraint}
            columnFilter={columnFilter}
            searchArticle={searchArticle}
          />
        </Container>
      </div>
    </div>
  );
};
export default Articles;
