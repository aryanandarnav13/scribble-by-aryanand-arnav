import React, { useState, useEffect } from "react";

import publicApi from "apis/public";

import EuiBody from "./EuiBody";
import EuiNavBar from "./EuiNavBar";
import SearchArticleModal from "./SearchArticleModal";

const Eui = ({ siteName }) => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await publicApi.listCategories();
      setCategories(response?.data?.categories);
    } catch (error) {
      logger.error(error);
    }
  };

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
    fetchCategories();
  }, []);

  return (
    <div>
      <EuiNavBar setShowModal={setShowModal} siteName={siteName} />
      <EuiBody articles={articles} categories={categories} />
      <SearchArticleModal
        articles={articles}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
};
export default Eui;
