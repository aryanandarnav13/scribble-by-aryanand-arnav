import React, { useEffect } from "react";

import { Typography } from "neetoui";
import { Scrollable } from "neetoui/layouts";

import { formatDateAndTime } from "../../Settings/ManageCategories/utils";

const VersionHistory = ({
  setRestoringArticle,
  setArticleVersionDetails,
  setShowModal,
  articleVersions,
  categories,
  setCategoryTitle,
  setCategoryNotExists,
  articleVersionDetails,
  articleDetails,
}) => {
  const fetchCategoryTitle = () => {
    const category = categories.find(
      category => category.id === articleVersionDetails.category_id
    );
    if (category) {
      setCategoryTitle(category?.name);
      setCategoryNotExists(false);
    } else {
      setCategoryTitle("Category Deleted");
      setCategoryNotExists(true);
    }
  };

  const fetchData = articleVersion => {
    setArticleVersionDetails(articleVersion.object);
    setRestoringArticle(articleVersion);
    setShowModal(true);
  };

  useEffect(() => {
    fetchCategoryTitle();
  }, [articleVersionDetails]);

  return (
    <div
      className="w-3/12 border-l-2 px-4"
      style={{ height: "calc(100% - 20px)" }}
    >
      <Typography className="mt-5" style="h2">
        Version History
      </Typography>
      <Typography className="mb-2" style="body2">
        Version history of {articleDetails.title} in Scribble.
      </Typography>
      <Scrollable>
        {articleVersions.length > 0 &&
          articleVersions.map(articleVersion => (
            <div className="my-5 flex items-baseline" key={articleVersion.id}>
              <Typography className="neeto-ui-text-gray-500" style="body2">
                {formatDateAndTime(articleVersion.created_at)}
              </Typography>
              <Typography
                className="neeto-ui-text-primary-500 ml-2 cursor-pointer"
                style="body2"
                weight="semibold"
                onClick={() => {
                  fetchData(articleVersion);
                }}
              >
                Article {articleVersion && articleVersion.object.status}ed
              </Typography>
            </div>
          ))}
      </Scrollable>
    </div>
  );
};

export default VersionHistory;
