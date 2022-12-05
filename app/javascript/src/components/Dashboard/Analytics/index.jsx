import React, { useState, useEffect } from "react";

import { Table, Pagination } from "neetoui";

import publicApi from "apis/public";
import NavBar from "components/NavBar";

import { analyticsColumnData } from "./utils";

const Analytics = () => {
  const [articles, setArticles] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchArticles = async () => {
    try {
      const payload = {
        page_number: pageNo,
      };
      const response = await publicApi.listArticles(payload);
      setArticles(response?.data?.articles);
      setTotalCount(response?.data?.published_articles_count);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [pageNo]);

  return (
    <div>
      <NavBar />
      <div className="mx-auto mt-10 w-7/12">
        <Table
          columnData={analyticsColumnData}
          rowData={articles}
          expandable={{
            expandedRowRender: record => (
              <div className="border-gray-500 bg-gray-200 p-2">
                <div className="flex w-1/4 bg-white">
                  <p className="ml-3">Date</p>
                  <p className="ml-24">Visits</p>
                </div>
                <div className="my-2 flex ">
                  <div>
                    {Object.keys(record?.views_date).map((key, index) => (
                      <div className="ml-2" key={index}>
                        {key}
                      </div>
                    ))}
                  </div>
                  <div className="ml-12">
                    {Object.values(record?.views_date).map((key, index) => (
                      <div className="ml-2" key={index}>
                        {key}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            rowExpandable: record => record.views !== 0,
          }}
        />
        <Pagination
          count={totalCount}
          pageNo={pageNo}
          pageSize={10}
          navigate={page => {
            setPageNo(page);
          }}
        />
      </div>
    </div>
  );
};
export default Analytics;
