import React from "react";

import { Table as NeetoUITable, Pagination } from "neetoui";

import { buildArticleTableColumnData } from "./utils";

const Table = ({
  columnFilter,
  articles,
  fetchArticles,
  pageNo,
  setPageNo,
  filteredDraftCount,
  filteredPublishCount,
}) => (
  <>
    <NeetoUITable
      columnData={buildArticleTableColumnData(columnFilter, fetchArticles)}
      rowData={articles}
    />
    <div className="flex w-full justify-end">
      <Pagination
        className="mt-8"
        count={filteredDraftCount + filteredPublishCount}
        pageNo={pageNo}
        pageSize={10}
        navigate={page => {
          setPageNo(page);
        }}
      />
    </div>
  </>
);
export default Table;
