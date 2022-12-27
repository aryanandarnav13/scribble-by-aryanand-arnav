import React from "react";

import { useMutation } from "@tanstack/react-query";
import { Edit, Delete } from "neetoicons";
import { Button } from "neetoui";

import articlesApi from "apis/articles";

const TableActions = ({ id, fetchArticles }) => {
  const { mutate: deleteArticle } = useMutation(
    async () => await articlesApi.destroy(id),
    {
      onSuccess: () => {
        fetchArticles();
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  return (
    <div className="flex">
      <Button icon={Delete} style="text" onClick={() => deleteArticle(id)} />
      <Button icon={Edit} style="text" to={`/articles/${id}/edit`} />
    </div>
  );
};

export default TableActions;
