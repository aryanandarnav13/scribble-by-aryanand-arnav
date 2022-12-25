import React from "react";

import { useMutation } from "@tanstack/react-query";
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
  const { mutate: transferArticles } = useMutation(
    async () => {
      const payload = {
        new_category_id: category?.id,
        article_ids: checkedArticle?.article,
      };

      return await articlesApi.transfer(payload);
    },
    {
      onSuccess: () => {
        fetchArticles();
        fetchCategories();
        setSearchCategory("");
        setCheckedArticle({
          article: [],
        });
        setOpen(false);
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  return (
    <Alert
      closeButton={false}
      isOpen={open}
      message={`Are you sure you want to transfer ${checkedArticle.article.length} article(s) from ${categoryToDisplay.name} category to ${category?.name} category?`}
      onClose={() => setOpen(false)}
      onSubmit={transferArticles}
    />
  );
};

export default ArticleTransferConfirmation;
