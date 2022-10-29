import React, { useState, useEffect } from "react";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import EuiBody from "./EuiBody";
import EuiNavBar from "./EuiNavBar";

const Eui = ({ siteName }) => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);

  const fetchCategoriesAndArticles = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      const {
        data: { articles },
      } = await articlesApi.list();
      setCategories(categories);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategoriesAndArticles();
  }, []);

  return (
    <div>
      <EuiNavBar siteName={siteName} />
      <EuiBody articles={articles} categories={categories} />
    </div>
  );
};
export default Eui;
