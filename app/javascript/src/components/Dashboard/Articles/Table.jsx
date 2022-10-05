import React from "react";

import { Table as NeetoUITable } from "@bigbinary/neetoui";

import { buildArticleTableColumnData } from "./constants";

const Table = ({ setSelectedArticleIds, articles = [] }) => (
  <div className="notes-table-height w-full">
    <NeetoUITable
      allowRowClick
      columnData={buildArticleTableColumnData()}
      rowData={articles}
      onRowSelect={selectedRowKeys => setSelectedArticleIds(selectedRowKeys)}
    />
  </div>
);

export default Table;
