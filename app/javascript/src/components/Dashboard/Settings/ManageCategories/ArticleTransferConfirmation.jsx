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
  categoryToDisplay,
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
      closeButton={false}
      isOpen={open}
      message={`Are you sure you want to transfer ${checkedArticle.article.length} article(s) from ${categoryToDisplay.name} category to ${category?.name} category?`}
      onClose={() => setOpen(false)}
      onSubmit={handleArticleTransfer}
    />
  );
};

export default ArticleTransferConfirmation;
