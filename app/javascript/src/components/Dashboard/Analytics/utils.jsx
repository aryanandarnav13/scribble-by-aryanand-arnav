import React from "react";

import { Typography } from "antd";
import { Tooltip } from "neetoui";
import { Link } from "react-router-dom";

export const analyticsColumnData = [
  {
    dataIndex: "title",
    key: "title",
    title: "TITLE",
    width: 150,
    render: (title, { slug }) => (
      <Tooltip content="Click to edit article." position="bottom">
        <Link to={`/preview/${slug}`}>
          <Typography>{title}</Typography>
        </Link>
      </Tooltip>
    ),
  },
  {
    dataIndex: "date",
    key: "date",
    title: "DATE",
    width: 100,
  },
  {
    dataIndex: "category",
    key: "category",
    title: "CATEGORY",
    width: 75,
  },
  {
    dataIndex: "views",
    key: "views",
    title: "VISITS",
    width: 50,
  },
];
