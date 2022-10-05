import React, { useState, useEffect } from "react";

import articlesApi from "apis/articles";
import PageLoader from "components/PageLoader";

import Article from "./Articles";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.list();
      setArticles(articles);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <Article data={articles} />
    </div>
  );
};

export default Dashboard;
