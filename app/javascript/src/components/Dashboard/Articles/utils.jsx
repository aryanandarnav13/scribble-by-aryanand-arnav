import React from "react";

import { Typography } from "antd";
import { Tooltip } from "neetoui";
import { Link } from "react-router-dom";

import TableActions from "./TableActions";

export const buildArticleTableColumnData = (columnFilter, fetchArticles) =>
  [
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
      width: "20%",
      render: (title, { id }) => (
        <Tooltip content="Click to edit article." position="bottom">
          <Link to={`/articles/${id}/edit`}>
            <Typography>{title}</Typography>
          </Link>
        </Tooltip>
      ),
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
      render: status => status.charAt(0).toUpperCase() + status.slice(1),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: "10%",
      render: (_, { id }) => (
        <TableActions fetchArticles={fetchArticles} id={id} />
      ),
    },
  ].filter(
    column => columnFilter[column.key] === true || column.key === "actions"
  );
