import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { PageLoader } from "neetoui";

import publicArticlesApi from "apis/public/articles";
import publicCategoriesApi from "apis/public/categories";

import EuiBody from "./EuiBody";
import EuiNavBar from "./EuiNavBar";
import SearchArticleModal from "./SearchArticleModal";

const Eui = ({ siteName }) => {
  const [showModal, setShowModal] = useState(false);

  const { data: categories, isLoading: categoriesLoading } = useQuery(
    ["categories"],
    async () => {
      const { data } = await publicCategoriesApi.listCategories();

      return data.categories;
    },
    {
      onError: error => {
        logger.error(error);
      },
    }
  );

  const { data: articles, isLoading: articlesLoading } = useQuery(
    ["articles"],
    async () => {
      const { data } = await publicArticlesApi.listArticles();

      return data.articles;
    },
    {
      onError: error => {
        logger.error(error);
      },
    }
  );

  if (categoriesLoading || articlesLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <EuiNavBar
        setShowModal={setShowModal}
        showModal={showModal}
        siteName={siteName}
      />
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
