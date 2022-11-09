import React, { useState, useEffect } from "react";

import { ActionDropdown } from "neetoui";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ArticlesList from "./ArticlesList";
import CategoriesMenu from "./CategoriesMenu";

const ManageCategories = () => {
  const [categoryToDisplay, setCategoryToDisplay] = useState({});
  const { Menu, MenuItem } = ActionDropdown;
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [info, setInfo] = useState(true);

  const fetchArticles = async () => {
    try {
      const payload = {
        statusFilter: "All",
        searchFilter: "",
      };
      const response = await articlesApi.list(payload);
      setArticles(response?.data.articles);
    } catch (err) {
      logger.error(err);
    }
  };
  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
      setCategoryToDisplay(categories[0]);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex">
        <CategoriesMenu
          articles={articles}
          categories={categories}
          fetchCategories={fetchCategories}
          setCategoryToDisplay={setCategoryToDisplay}
        />
        <div style={{ width: "780px" }}>
          <div className="flex justify-between pb-4">
            <div className=" pl-8 pt-8 text-xl font-semibold">
              Manage articles
            </div>
            <ActionDropdown
              buttonStyle="secondary"
              className="mr-3 mt-3"
              label="Move to"
            >
              <Menu>
                {categories.map((category, idx) => (
                  <MenuItem.Button
                    key={idx}
                    onClick={() => {
                      // console.log(category);
                    }}
                  >
                    {category.name}
                  </MenuItem.Button>
                ))}
              </Menu>
            </ActionDropdown>
          </div>
          {info && (
            <div className="m-4 mr-1 mt-2 bg-blue-100 p-4">
              You can reorder categories or articles by drag and drop here. You
              can also multiselect articles and move them together to any
              category you have created.
              <span
                className="cursor-pointer underline"
                onClick={() => {
                  setInfo(false);
                }}
              >
                {" "}
                Don't show this info again.
              </span>
            </div>
          )}
          <div className="ml-4">
            {/* {articles.map(
              (article, index) =>
                article.category === categoryToDisplay.name && (
                  <ArticlesList article={article} key={index} />
                )
            )} */}
            <ArticlesList
              articles={articles}
              categoryToDisplay={categoryToDisplay}
              fetchArticles={fetchArticles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageCategories;
