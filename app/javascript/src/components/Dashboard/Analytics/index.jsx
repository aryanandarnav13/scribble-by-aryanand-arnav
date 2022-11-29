import React, { useState, useEffect } from "react";

import { Table } from "neetoui";

import publicApi from "apis/public";
import NavBar from "components/NavBar";

import { analyticsColumnData } from "./utils";

const Analytics = () => {
  const [articles, setArticles] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const fetchArticles = async () => {
    try {
      const response = await publicApi.listArticles();
      setArticles(response?.data?.articles);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="mx-auto mt-10 w-7/12">
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
