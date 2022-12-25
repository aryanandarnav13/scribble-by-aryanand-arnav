import React from "react";

import { useQuery } from "@tanstack/react-query";
import { Typography } from "neetoui";

import publicArticlesApi from "apis/public/articles";

const Show = ({ slug }) => {
  const { data: displayArticle } = useQuery(
    ["displayArticle", slug],
    async () => {
      const { data } = await publicArticlesApi.show(slug);

      return data;
    },
    {
      onError: error => {
        logger.error(error);
      },
    }
  );

  return (
    <div className="m-8 w-3/4">
      <Typography style="h1">{displayArticle?.title}</Typography>
      <div className="mt-2 flex">
        <Typography
          className="neeto-ui-rounded neeto-ui-bg-primary-100 neeto-ui-text-primary-800 mr-4 py-1 px-3"
          style="h5"
        >
          {displayArticle?.category?.label}
        </Typography>
        <Typography className="neeto-ui-text-gray-400 p-1" style="h5">
          {displayArticle?.date}
        </Typography>
      </div>
      <div className="py-4">{displayArticle?.body}</div>
    </div>
  );
};
export default Show;
