import React, { useEffect, useState } from "react";

import { Table as NeetoUITable, Pagination } from "neetoui";

import articlesApi from "apis/articles";

import { buildArticleTableColumnData } from "./utils";

const Table = ({
  columnFilter,
  searchArticle,
  articleFilterConstraint,
  filteredDraftCount,
  filteredPublishCount,
  setFilteredDraftCount,
  setFilteredPublishCount,
}) => {
  const [articles, setArticles] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const fetchArticles = async () => {
    try {
      const payload = {
        statusFilter: articleFilterConstraint.status,
        categoriesFilter: articleFilterConstraint.category,
        searchFilter: searchArticle,
        page_number: pageNo,
      };
      const response = await articlesApi.list(payload);
      setFilteredDraftCount(response.data.draft);
      setFilteredPublishCount(response.data.publish);
      setArticles(response.data.articles);
    } catch (err) {
      logger.error(err);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, [searchArticle, articleFilterConstraint, pageNo]);

  return (
    <>
      <NeetoUITable
        columnData={buildArticleTableColumnData(columnFilter, fetchArticles)}
        rowData={articles}
      />
      <Pagination
        className="mt-8"
        count={filteredDraftCount + filteredPublishCount}
        pageNo={pageNo}
        pageSize={10}
        navigate={page => {
          setPageNo(page);
        }}
      />
    </>
  );
};
export default Table;
