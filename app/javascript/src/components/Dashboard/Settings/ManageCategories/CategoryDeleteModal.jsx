import React from "react";

import { Info } from "neetoicons";
import { Modal, Typography, Button, Select } from "neetoui";

const CategoryDeleteModal = ({
  categoryToDelete,
  showAlert,
  setShowAlert,
  categories,
  articles,
  filteredCategories,
  setCategoryToUpdateTo,
  switchAndDeleteCategory,
}) => (
  <Modal isOpen={showAlert} size="medium" onClose={() => setShowAlert(false)}>
    <Modal.Header>
      <Typography style="h2">Delete Category</Typography>
    </Modal.Header>
    <Modal.Body>
      <Typography lineHeight="normal" style="body1">
        {`You are permanently deleting the ${categoryToDelete?.name}
         category. This action cannot be undone. Are you sure you wish to
        continue?`}
      </Typography>
      <div className="bg-opacity-30 mt-4 flex items-center space-x-4 rounded-md border-2 border-red-500 bg-red-200 p-3">
        <Info size={70} />
        {categories.length > 1 ? (
          <div className="text-base">
            {`Category "${categoryToDelete?.name} has ${
              articles?.filter(item => item.category === categoryToDelete?.name)
                .length
            } article (s). Before this category can be
            deleted, these articles need to be moved to another category.`}
          </div>
        ) : (
          <div className="text-base">
            {`Category ${categoryToDelete?.name} has ${
              articles?.filter(item => item.category === categoryToDelete?.name)
                .length
            } article (s). All the articles under this
            category will be moved to a new category called General.`}
          </div>
        )}
      </div>
      {categories.length > 1 ? (
        <div className="mt-4">
          <Select
            label="Select a category to move these articles into*"
            options={filteredCategories()}
            onChange={element => setCategoryToUpdateTo(element)}
          />
        </div>
      ) : null}
    </Modal.Body>
    <Modal.Footer className="space-x-2">
      <Button
        label="Proceed"
        style="danger"
        onClick={() => switchAndDeleteCategory()}
      />
      <Button label="Cancel" style="text" onClick={() => setShowAlert(false)} />
    </Modal.Footer>
  </Modal>
);
export default CategoryDeleteModal;
