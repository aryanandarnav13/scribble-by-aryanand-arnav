import React, { useEffect, useState } from "react";

import { Table as NeetoUITable } from "neetoui";

import articlesApi from "apis/articles";

import { buildArticleTableColumnData } from "./utils";

const Table = ({
  columnFilter,
  searchArticle,
  articleFilterConstraint,
  setFilteredDraftCount,
  setFilteredPublishCount,
}) => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const payload = {
        statusFilter: articleFilterConstraint.status,
        categoriesFilter: articleFilterConstraint.category,
        searchFilter: searchArticle,
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
  }, [searchArticle, articleFilterConstraint]);

  return (
    <NeetoUITable
      columnData={buildArticleTableColumnData(columnFilter, fetchArticles)}
      defaultPageSize={20}
      rowData={articles}
      onRowClick={() => {}}
      onRowSelect={() => {}}
    />
  );
};
export default Table;
