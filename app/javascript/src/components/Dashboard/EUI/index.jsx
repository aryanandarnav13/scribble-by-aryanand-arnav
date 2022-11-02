import React, { useState, useEffect } from "react";

import euiApi from "apis/eui";

import EuiBody from "./EuiBody";
import EuiNavBar from "./EuiNavBar";

const Eui = ({ siteName }) => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await euiApi.listCategories();
      setCategories(response.data.categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await euiApi.listArticles();
      setArticles(response.data.articles);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  return (
    <div>
      <EuiNavBar siteName={siteName} />
      <EuiBody articles={articles} categories={categories} />
    </div>
  );
};
export default Eui;
