import React, { useState, useEffect } from "react";

import { Clock } from "neetoicons";
import { Typography, Tag, Tooltip, Checkbox } from "neetoui";

import { calculateCreatedAgo, weekDaydateFormat } from "./utils";

const ArticlesList = ({ article }) => {
  const [tagColor, setTagColor] = useState("");

  const setTag = async () => {
    try {
      article.status === "Publish"
        ? setTagColor("info")
        : setTagColor("warning");
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    setTag();
  }, []);

  return (
    <div className="neeto-ui-shadow-xs neeto-ui-rounded-none neeto-ui-border-gray-400 border mb-4 w-full space-y-2 p-5">
      <div>
        <Checkbox id="checkbox_name_disabled" />
        <Typography className="mt-2" style="h4">
          {article.title}
        </Typography>
      </div>
      <div className="mb-2">
        <Typography className="text-sm" style="body2">
          {article.body}
        </Typography>
      </div>
      <hr />
      <div className="mt-3 flex align-middle ">
        <div className="item-center ml-auto flex space-x-2">
          <Clock size="20" />
          <Tooltip
            content={weekDaydateFormat(article.created_at)}
            position="bottom"
          >
            <Typography style="body3">
              {`Created ${calculateCreatedAgo(article.created_at)} `}
            </Typography>
          </Tooltip>
        </div>
        <Tag
          className="neeto-ui-rounded-none ml-2 bg-gray-200"
          label={article.status}
          style={tagColor}
          type="solid"
        />
      </div>
    </div>
  );
};
export default ArticlesList;
