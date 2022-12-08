import React, { useState, useEffect } from "react";

import { Input, Dropdown } from "neetoui";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ArticlesList from "./ArticlesList";
import ArticleTransferConfirmation from "./ArticleTransferConfirmation";
import CategoriesMenu from "./CategoriesMenu";

const ManageCategories = () => {
  const [categoryToDisplay, setCategoryToDisplay] = useState({});
  const { Menu, MenuItem } = Dropdown;
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [info, setInfo] = useState(true);
  const [checkedArticle, setCheckedArticle] = useState({
    article: [],
  });
  const [open, setOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [categoryToTransferTo, setCategoryToTransferTo] = useState("");

  const handleInfo = () => {
    const bannerCondition = localStorage.getItem("banner");
    if (bannerCondition === "false") {
      setInfo(false);
    }
  };

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
      if (categoryToDisplay.id === undefined) {
        setCategoryToDisplay(categories[0]);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
    handleInfo();
  }, []);

  return (
    <div>
      <div className="flex">
        <CategoriesMenu
          articles={articles}
          categories={categories}
          categoryToDisplay={categoryToDisplay}
          fetchArticles={fetchArticles}
          fetchCategories={fetchCategories}
          setCategoryToDisplay={setCategoryToDisplay}
          setCheckedArticle={setCheckedArticle}
        />
        <div style={{ width: "780px" }}>
          <div className="flex justify-between pb-4">
            <div className=" pl-8 pt-8 text-xl font-semibold">
              Manage articles
            </div>
            <div className="mt-6 p-0">
              <Dropdown
                buttonStyle="secondary"
                closeOnSelect={false}
                disabled={checkedArticle.article.length === 0}
                label="Move to"
                onClick={() => {
                  setSearchCategory("");
                }}
              >
                <div className="flex flex-col gap-y-1 rounded-md p-2">
                  <Input
                    className="m-2"
                    placeholder="Search category"
                    prefix={<s />}
                    type="search"
                    value={searchCategory}
                    onChange={e => setSearchCategory(e.target.value)}
                  />
                  <Menu className="flex flex-col gap-y-1">
                    {categories
                      .filter(
                        category => category.name !== categoryToDisplay.name
                      )
                      .filter(category =>
                        category.name
                          .toLowerCase()
                          .includes(searchCategory.toLocaleLowerCase())
                      )
                      .map(category => (
                        <MenuItem.Button
                          key={category.id}
                          onClick={() => {
                            setOpen(true);
                            setCategoryToTransferTo(category);
                          }}
                        >
                          {category.name}
                        </MenuItem.Button>
                      ))}
                  </Menu>
                </div>
              </Dropdown>
            </div>
          </div>
          {info && (
            <div className="m-4 mr-1 mt-2 bg-blue-100 p-4 text-xs text-gray-600">
              You can reorder categories or articles by drag and drop here. You
              can also multiselect articles and move them together to any
              category you have created.
              <span
                className="cursor-pointer underline"
                onClick={() => {
                  setInfo(false);
                  localStorage.setItem("banner", false);
                }}
              >
                Don't show this info again.
              </span>
            </div>
          )}
          <div className="ml-4">
            <ArticlesList
              checkedArticle={checkedArticle}
              fetchArticles={fetchArticles}
              setCheckedArticle={setCheckedArticle}
              articles={articles.filter(
                article => article.category === categoryToDisplay.name
              )}
            />
          </div>
        </div>
      </div>
      {open && (
        <ArticleTransferConfirmation
          category={categoryToTransferTo}
          categoryToDisplay={categoryToDisplay}
          checkedArticle={checkedArticle}
          fetchArticles={fetchArticles}
          fetchCategories={fetchCategories}
          open={open}
          setCheckedArticle={setCheckedArticle}
          setOpen={setOpen}
          setSearchCategory={setSearchCategory}
        />
      )}
    </div>
  );
};
export default ManageCategories;
