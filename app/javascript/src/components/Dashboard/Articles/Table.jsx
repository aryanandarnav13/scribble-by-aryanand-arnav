import React, { useEffect, useState } from "react";

import { Table as NeetoUITable } from "neetoui";

import articlesApi from "apis/articles";

import { buildArticleTableColumnData } from "./utils";

const Table = ({ columnFilter, searchArticle, articleFilterConstraint }) => {
  const [articles, setArticles] = useState([]);
  const [filteredRowData, setFilteredRowData] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list();
      setArticles(response.data.articles);
    } catch (err) {
      logger.error(err);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const filteredResponse = articles
      .filter(
        row =>
          row.status === articleFilterConstraint.status ||
          articleFilterConstraint.status === "All"
      )
      .filter(
        row =>
          articleFilterConstraint.category.includes(row.category) ||
          articleFilterConstraint.category.length === 0
      )
      .filter(row =>
        row.title.toLowerCase().includes(searchArticle.toLowerCase())
      );

    setFilteredRowData(filteredResponse);
  }, [articleFilterConstraint, articles, searchArticle]);

  return (
    <NeetoUITable
      columnData={buildArticleTableColumnData(columnFilter, fetchArticles)}
      defaultPageSize={20}
      rowData={filteredRowData}
      onRowClick={() => {}}
      onRowSelect={() => {}}
    />
  );
};
export default Table;
