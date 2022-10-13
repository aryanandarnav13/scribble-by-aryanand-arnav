import React, { useEffect, useState } from "react";

import { Plus, Check, Close } from "@bigbinary/neeto-icons";
import { Input, Button, Typography } from "@bigbinary/neetoui";

import categoriesApi from "apis/categories";

import CategoriesAction from "./CategoriesAction";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const fetchCategories = async () => {
    try {
      const res = await categoriesApi.list();
      setCategories(res.data.categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
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
          className="neeto-ui-text-primary-500 mt-7 mb-8 flex cursor-pointer items-center font-bold"
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

  return (
    <div className="mx-auto mt-8 w-2/6">
      <div>
        <Typography style="h2">Manage Categories</Typography>
        <Typography className="neeto-ui-text-gray-600 mt-1" style="body1">
          Create and configure categories inside your scribble.
        </Typography>
        {AddCategory()}
        <CategoriesAction
          categories={categories}
          fetchCategories={fetchCategories}
        />
      </div>
    </div>
  );
};
export default ManageCategories;
