import React from "react";

import ArticleOperations from "./ArticleOperations";

export const buildArticleTableColumnData = (columnFilter, fetchArticles) =>
  [
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
      width: "20%",
    },
    {
      dataIndex: "date",
      key: "date",
      title: "DATE",
      width: "20%",
    },
    {
      title: "AUTHOR",
      dataIndex: "author",
      key: "author",
      width: "20%",
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      width: "20%",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "15%",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: "10%",
      render: (_, { id }) => (
        <ArticleOperations fetchArticles={fetchArticles} id={id} />
      ),
    },
  ].filter(
    column => columnFilter[column.key] === true || column.key === "actions"
  );
