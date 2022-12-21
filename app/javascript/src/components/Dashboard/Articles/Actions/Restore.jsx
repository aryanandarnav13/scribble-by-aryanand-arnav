import React, { useState, useEffect } from "react";

import { Warning, Info } from "neetoicons";
import { Typography, Modal, Button, Textarea, Input, Callout } from "neetoui";

import articleSchedulesApi from "apis/article_schedules";
import articleVersionsApi from "apis/article_versions";

const RestoreArticle = ({
  showModal,
  setShowModal,
  id,
  articleToBeRestored,
  articleVersionDetails,
  currentArticleDetails,
  categoryTitle,
  categoryDeletedInfo,
  refetch,
  setRefetch,
}) => {
  const [scheduledUpdates, setScheduledUpdates] = useState([]);

  const restoreVersionHandle = async () => {
    try {
      await articleVersionsApi.update({
        id,
        versionAt: articleToBeRestored.created_at,
        restoredAt: articleToBeRestored.object.updated_at,
      });
      setRefetch(prevFetch => !prevFetch);
      setShowModal(false);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchUpdateSchedules = async () => {
    try {
      const res = await articleSchedulesApi.list(id);
      setScheduledUpdates([...res.data.schedules]);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchUpdateSchedules();
  }, [refetch]);

  return (
    <Modal isOpen={showModal} size="large" onClose={() => setShowModal(false)}>
      <Modal.Header>
        <Typography id="dialog1Title" style="h3">
          Version History
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <Typography className="mb-2" lineHeight="normal" style="body2">
          Version history of {currentArticleDetails.title} in Scribble.
        </Typography>
        {categoryDeletedInfo && (
          <div className="mb-2">
            <Callout icon={Info} style="info">
              The category of this article version was deleted. So on Restore,
              the article will be either moved to General category if it exists,
              or General category will created and moved automatically.
            </Callout>
          </div>
        )}
        {scheduledUpdates.length > 0 && (
          <div className="mb-2 w-10/12">
            <Callout icon={Warning} style="danger">
              On restore, all the scheduled updates will be deleted.
            </Callout>
          </div>
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
