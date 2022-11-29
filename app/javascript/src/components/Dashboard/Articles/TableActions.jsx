import React from "react";

import { Edit, Delete } from "neetoicons";
import { Button } from "neetoui";

import articlesApi from "apis/articles";

const TableActions = ({ id, fetchArticles }) => {
  const deleteArticle = async () => {
    try {
      await articlesApi.destroy(id);
      fetchArticles();
      window.location.reload();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex">
      <Button icon={Delete} style="text" onClick={() => deleteArticle(id)} />
      <Button icon={Edit} style="text" to={`/articles/${id}/edit`} />
    </div>
  );
};

export default TableActions;
