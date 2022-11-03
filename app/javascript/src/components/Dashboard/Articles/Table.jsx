import React, { useEffect, useState } from "react";

import { Table as NeetoUITable } from "neetoui";

import articlesApi from "apis/articles";

import { buildArticleTableColumnData } from "./utils";

const Table = ({
  columnFilter,
  searchArticle,
  articleFilterConstraint,
  setDraftCount,
  setPublishCount,
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
      setArticles(response.data.articles);
      setDraftCount(response.data.draft);
      setPublishCount(response.data.publish);
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
