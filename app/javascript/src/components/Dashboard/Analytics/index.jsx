import React, { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { Table, Pagination, PageLoader } from "neetoui";

import articlesApi from "apis/articles";
import NavBar from "components/NavBar";

import { analyticsColumnData } from "./utils";

const Analytics = () => {
  const [pageNo, setPageNo] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const {
    data,
    isLoading,
    refetch: fetchArticles,
  } = useQuery(
    ["articles"],
    async () => {
      const payload = {
        statusFilter: "published",
        searchFilter: "",
        page_number: pageNo,
      };
      const { data } = await articlesApi.list(payload);

      return data;
    },
    {
      onSuccess: data => {
        setTotalCount(data?.published_articles_count);
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  useEffect(() => {
    fetchArticles();
  }, [pageNo]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <NavBar />
      <div className="mx-auto mt-10 w-7/12">
        <Table
          columnData={analyticsColumnData}
          rowData={data?.articles}
          expandable={{
            expandedRowRender: record => (
              <div className="border-gray-500 bg-gray-200 p-2">
                <div className="flex w-1/4 bg-white">
                  <div className="ml-3">Date</div>
                  <div className="ml-24">Visits</div>
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
