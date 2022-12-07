import React, { useEffect } from "react";

import { Typography, Tooltip } from "neetoui";
import { Scrollable } from "neetoui/layouts";

import { formatDateAndTime } from "../../Settings/ManageCategories/utils";

const VersionHistory = ({
  setArticleToBeRestored,
  setArticleVersionDetails,
  setShowModal,
  articleVersions,
  categories,
  setCategoryTitle,
  setCategoryDeletedInfo,
  articleVersionDetails,
  currentArticleDetails,
}) => {
  const fetchCategoryTitle = () => {
    const category = categories.find(
      category => category.id === articleVersionDetails.category_id
    );
    if (category) {
      setCategoryTitle(category?.name);
      setCategoryDeletedInfo(false);
    } else {
      setCategoryTitle("Category Deleted");
      setCategoryDeletedInfo(true);
    }
  };

  const fetchData = articleVersion => {
    setArticleVersionDetails(articleVersion.object);
    setArticleToBeRestored(articleVersion);
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
        Version history of {currentArticleDetails.title} in Scribble.
      </Typography>
      <Typography className="mb-4" style="body3">
        <div className="rounded my-3 mr-4 flex items-baseline border-black bg-gray-200 p-4">
          <div>
            <Typography className="neeto-ui-text-gray-500" style="body3">
              {formatDateAndTime(currentArticleDetails.updated_at)}
            </Typography>
            {currentArticleDetails.restored_at && (
              <Typography className="neeto-ui-text-gray-500" style="body3">
                {`(Restored from ${formatDateAndTime(
                  currentArticleDetails.restored_at
                )})`}
              </Typography>
            )}
            <Typography className="font-bold" style="body3">
              Current version
            </Typography>
          </div>
          <Typography
            className="neeto-ui-gray-700 rounded ml-6 mt-2 p-1 capitalize"
            style="body2"
            weight="semibold"
          >
            Article {currentArticleDetails.status}
          </Typography>
        </div>
      </Typography>
      <Scrollable>
        {articleVersions.length > 0 &&
          articleVersions.map(articleVersion => (
            <div
              className="my-3 mr-4 flex items-baseline border-black bg-gray-100 p-4"
              key={articleVersion.id}
            >
              <div>
                <Typography className="neeto-ui-text-gray-500" style="body3">
                  {formatDateAndTime(articleVersion.object?.updated_at)}
                </Typography>
                {articleVersion.object?.restored_at && (
                  <Typography className="neeto-ui-text-gray-500 " style="body3">
                    (Restored from{" "}
                    {formatDateAndTime(articleVersion.object?.restored_at)})
                  </Typography>
                )}
              </div>
              <Tooltip
                content="Click to restore this version."
                disabled={articleVersion.object?.restored_at}
                position="bottom"
              >
                <Typography
                  style="body2"
                  weight="semibold"
                  className={
                    !articleVersion.object?.restored_at
                      ? "neeto-ui-text-primary-800 ml-4 cursor-pointer capitalize"
                      : "neeto-ui-text-primary-500 ml-4 capitalize"
                  }
                  onClick={() => {
                    !articleVersion.object?.restored_at &&
                      fetchData(articleVersion);
                  }}
                >
                  Article {articleVersion && articleVersion.object?.status}
                </Typography>
              </Tooltip>
            </div>
          ))}
      </Scrollable>
    </div>
  );
};

export default VersionHistory;
