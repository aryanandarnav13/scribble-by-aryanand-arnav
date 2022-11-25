import React, { useState, useEffect } from "react";

import { Table } from "neetoui";

import articlesApi from "apis/articles";
import NavBar from "components/NavBar";

import { analyticsColumnData } from "./utils";

const Analytics = () => {
  const [articles, setArticles] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const fetchArticles = async () => {
    try {
      const payload = {
        statusFilter: "All",
        searchFilter: "",
      };
      const response = await articlesApi.list(payload);
      setArticles(response?.data.articles);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="mx-auto mt-10 w-10/12">
        <Table
          columnData={analyticsColumnData}
          currentPageNumber={pageNo}
          defaultPageSize={10}
          rowData={articles}
          handlePageChange={page => {
            setPageNo(page);
          }}
          onRowClick={() => {}}
          onRowSelect={() => {}}
        />
      </div>
    </div>
  );
};
export default Analytics;
