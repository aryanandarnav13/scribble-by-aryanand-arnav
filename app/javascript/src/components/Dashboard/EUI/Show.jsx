import React, { useState, useEffect } from "react";

import { Typography } from "neetoui";

import publicApi from "apis/public";

const Show = ({ slug }) => {
  const [displayArticle, setDisplayArticle] = useState({});

  const fetchDisplayArticles = async () => {
    try {
      const response = await publicApi.show(slug);
      setDisplayArticle(response?.data);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchDisplayArticles();
  }, [slug]);

  return (
    <div className="m-8 w-3/4">
      <Typography style="h1">{displayArticle.title}</Typography>
      <div className="mt-2 flex">
        <Typography
          className="neeto-ui-rounded neeto-ui-bg-primary-100 neeto-ui-text-primary-800 mr-4 py-1 px-3"
          style="h5"
        >
          {displayArticle?.category?.label}
        </Typography>
        <Typography className="neeto-ui-text-gray-400 p-1" style="h5">
          {displayArticle.date}
        </Typography>
      </div>
      <div className="py-4">{displayArticle.body}</div>
    </div>
  );
};
export default Show;
