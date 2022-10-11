import React, { useEffect, useState } from "react";

import { Table as NeetoUITable } from "@bigbinary/neetoui";

import articlesApi from "apis/articles";

import { buildArticleTableColumnData } from "./utils";

const Table = ({ columnFilter }) => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list();
      setArticles(response.data);
    } catch (err) {
      logger.error(err);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

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
