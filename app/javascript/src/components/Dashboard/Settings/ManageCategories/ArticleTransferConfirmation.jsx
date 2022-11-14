import React from "react";

import { Alert } from "neetoui";

import articlesApi from "apis/articles";

const ArticleTransferConfirmation = ({
  fetchCategories,
  open,
  category,
  setOpen,
  fetchArticles,
  checkedArticle,
  setSearchCategory,
  setCheckedArticle,
}) => {
  const handleArticleTransfer = async () => {
    const payload = {
      new_category_id: category?.id,
      article_ids: checkedArticle?.article,
    };
    try {
      await articlesApi.transfer(payload);
    } catch (error) {
      logger.error(error);
    } finally {
      fetchArticles();
      fetchCategories();
      setSearchCategory("");
      setCheckedArticle({
        article: [],
      });
      setOpen(false);
    }
  };

  return (
    <Alert
      isOpen={open}
      message="Are you sure you want to transfer these articles?"
      onClose={() => setOpen(false)}
      onSubmit={handleArticleTransfer}
    />
  );
};

export default ArticleTransferConfirmation;
