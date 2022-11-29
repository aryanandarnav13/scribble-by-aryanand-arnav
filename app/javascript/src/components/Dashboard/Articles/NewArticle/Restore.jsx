import React from "react";

import { Typography, Modal, Button, Textarea, Input } from "neetoui";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";

const RestoreArticle = ({
  showModal,
  setShowModal,
  id,
  restoringArticle,
  articleVersionDetails,
  articleDetails,
  categoryTitle,
  categoryNotExists,
}) => {
  const history = useHistory();

  const restoreVersionHandle = async () => {
    try {
      await articlesApi.restore({
        id,
        versionAt: restoringArticle.created_at,
      });
      history.push("/");
      setShowModal(false);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal isOpen={showModal} size="large" onClose={() => setShowModal(false)}>
      <Modal.Header>
        <Typography id="dialog1Title" style="h3">
          Version History
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <Typography className="mb-2" lineHeight="normal" style="body2">
          Version history of {articleDetails.title} in Scribble.
        </Typography>
        {categoryNotExists && (
          <Typography
            className="mb-4 bg-red-100 p-1 font-serif text-xs text-gray-600"
            style="body3"
          >
            The category of this article version was deleted. So on Restore, the
            article will be either moved to General category if it exists, or
            General category will created and moved automatically.
          </Typography>
        )}
        <div className="mt-6 w-full">
          <div className="grid grid-cols-2 space-x-20">
            <Input
              disabled
              label="Article Title"
              placeholder={articleVersionDetails.title}
            />
            <Input disabled label="Category" placeholder={categoryTitle} />
          </div>
          <Textarea
            disabled
            className="truncate mt-6"
            label="Article Content"
            placeholder={articleVersionDetails.body}
            rows="5"
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button
          label="Restore Version"
          size="large"
          onClick={() => restoreVersionHandle()}
        />
        <Button
          label="Cancel"
          size="large"
          style="text"
          onClick={() => setShowModal(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};
export { RestoreArticle };
