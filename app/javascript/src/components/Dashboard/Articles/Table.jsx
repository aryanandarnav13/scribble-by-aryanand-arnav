import React from "react";

import { Table as NeetoUITable } from "@bigbinary/neetoui";

import { ROW_DATA, buildArticleTableColumnData } from "./constants";

const Table = () => (
  <NeetoUITable
    allowRowClick
    pagination
    columnData={buildArticleTableColumnData()}
    rowData={ROW_DATA}
    onRowClick={() => {}}
  />
);

export default Table;
