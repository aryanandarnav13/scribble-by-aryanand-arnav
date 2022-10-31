import React, { useEffect, useState } from "react";

import { Plus, Check, Close, Info } from "neetoicons";
import { Input, Button, Typography, Modal, Select } from "neetoui";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import CategoriesAction from "./CategoriesAction";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToUpdateTo, setCategoryToUpdateTo] = useState(null);
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list();
      setArticles(response.data.articles);
    } catch (err) {
      logger.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await categoriesApi.list();
      setCategories(res.data.categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const createNewCategory = async () => {
    try {
      await categoriesApi.create({ name: newCategory.trim() });
      setAddNew(false);
      setNewCategory("");
      fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const AddCategory = () => {
    if (!addNew) {
      return (
        <div
          className="neeto-ui-text-primary-500 mt-7 mb-8 mt-5 flex cursor-pointer items-center font-bold"
          onClick={() => setAddNew(open => !open)}
        >
          <Plus className="mr-1" />
          <Typography>Add New Category</Typography>
        </div>
      );
    }

    return (
      <div className="mt-7 mb-6 flex">
        <Input
          autoFocus
          placeholder="Enter Category Name"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
        />
        <div className="ml-5">
          <Button icon={Check} style="primary" onClick={createNewCategory} />
          <Button
            className="ml-2"
            icon={Close}
            style="text"
            onClick={() => {
              setAddNew(open => !open);
              setNewCategory("");
            }}
          />
        </div>
      </div>
    );
  };

  const filteredCategories = () => {
    const filteredCategoriesArray = [];
    categories.map(category => {
      if (category.id !== categoryToDelete?.id) {
        filteredCategoriesArray.push({
          value: category.id,
          label: category.name,
        });
      }
    });

    return filteredCategoriesArray;
  };

  const switchAndDeleteCategory = async () => {
    if (categories.length === 1) {
      try {
        await categoriesApi.destroy(categoryToDelete.id, {
          id: categoryToDelete.id,
        });
        await fetchCategories();
        setShowAlert(false);
      } catch (error) {
        logger.log(error);
      }
    } else {
      try {
        await categoriesApi.destroy(categoryToDelete.id, {
          id: categoryToDelete.id,
          new_category_id: categoryToUpdateTo.value,
        });
        await fetchCategories();
        setShowAlert(false);
      } catch (error) {
        logger.error(error);
      }
    }
  };

  return (
    <>
      <div className="mx-auto mt-8 w-2/6">
        <div>
          <Typography style="h2">Manage Categories</Typography>
          <Typography className="neeto-ui-text-gray-600 mt-1" style="body1">
            Create and configure categories inside your scribble.
          </Typography>
          {AddCategory()}
          <CategoriesAction
            articles={articles}
            categories={categories}
            fetchCategories={fetchCategories}
            setCategoryToDelete={setCategoryToDelete}
            setShowAlert={setShowAlert}
          />
        </div>
      </div>
      <Modal
        isOpen={showAlert}
        size="medium"
        onClose={() => setShowAlert(false)}
      >
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
                  articles?.filter(
                    item => item.category === categoryToDelete?.name
                  ).length
                } article (s). Before this category can be
                deleted, these articles need to be moved to another category.`}
              </div>
            ) : (
              <div className="text-base">
                {`Category ${categoryToDelete?.name} has ${
                  articles?.filter(
                    item => item.category === categoryToDelete?.name
                  ).length
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
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowAlert(false)}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ManageCategories;
