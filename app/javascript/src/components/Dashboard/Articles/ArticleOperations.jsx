import React from "react";

import { Edit, Delete } from "neetoicons";
import { Button } from "neetoui";

import articlesApi from "apis/articles";

const ArticleOperations = ({ slug, fetchArticles }) => {
  const deleteArticle = async () => {
    const message = confirm(
      "Are you sure you want to delete this article? This change cannot be undone."
    );
    if (message) {
      try {
        await articlesApi.destroy(slug);
        fetchArticles();
      } catch (error) {
        logger.error(error);
      }
    }
  };

  return (
    <div className="flex">
      <Button icon={Delete} style="text" onClick={() => deleteArticle(slug)} />
      <Button icon={Edit} style="text" to={`/articles/${slug}/edit`} />
    </div>
  );
};

export default ArticleOperations;
