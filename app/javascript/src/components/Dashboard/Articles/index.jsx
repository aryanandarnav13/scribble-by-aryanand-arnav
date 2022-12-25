import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { useMutation } from "@tanstack/react-query";
import { ActionDropdown, Button, Checkbox } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import articlesApi from "apis/articles";
import NavBar from "components/NavBar";

import { COLUMN_FILTERS, camelize } from "./constants";
import SideMenu from "./SideMenu";
import Table from "./Table";

const Articles = () => {
  const [searchArticle, setSearchArticle] = useState("");
  const [articles, setArticles] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [columnFilter, setColumnFilter] = useState(COLUMN_FILTERS);
  const [totalDraftCount, setTotalDraftCount] = useState(0);
  const [totalPublishCount, setTotalPublishCount] = useState(0);
  const [filteredDraftCount, setFilteredDraftCount] = useState(0);
  const [filteredPublishCount, setFilteredPublishCount] = useState(0);
  const [articleFilterConstraint, setArticleFilterConstraint] = useState({
    status: "All",
    category: [],
  });
  const { Menu, MenuItem } = ActionDropdown;

  const handleColumnCheck = e => {
    if (!(e.target.name === "title" && !e.target.checked)) {
      setColumnFilter({
        ...columnFilter,
        [e.target.name]: e.target.checked,
      });
    }
  };

  const { mutate: fetchArticles, isLoading } = useMutation(
    async () => {
      const payload = {
        statusFilter: articleFilterConstraint.status,
        categoriesFilter: articleFilterConstraint.category,
        searchFilter: searchArticle,
        page_number: pageNo,
      };

      const { data } = await articlesApi.list(payload);

      return data;
    },
    {
      onSuccess: data => {
        setArticles(data.articles);
        setFilteredDraftCount(data.drafted);
        setFilteredPublishCount(data.published);
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  useEffect(() => {
    fetchArticles();
  }, [searchArticle, articleFilterConstraint, pageNo]);

  if (isLoading) {
    return <PageLoader />;
  }

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
                  label="Add new article"
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
            {articles.length} Articles
          </div>
          <Table
            articles={articles}
            columnFilter={columnFilter}
            fetchArticles={fetchArticles}
            filteredDraftCount={filteredDraftCount}
            filteredPublishCount={filteredPublishCount}
            pageNo={pageNo}
            setPageNo={setPageNo}
          />
        </Container>
      </div>
    </div>
  );
};
export default Articles;
