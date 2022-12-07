import React, { useState, useEffect } from "react";

import { Search, Plus, Close } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Create from "./Category/Create";

const SideMenu = ({
  articleFilterConstraint,
  setArticleFilterConstraint,
  setTotalDraftCount,
  totalDraftCount,
  totalPublishCount,
  setTotalPublishCount,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCategoryCollapsed, setIsAddCategoryCollapsed] = useState(true);
  const [searchCategory, setSearchCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
      setIsAddCategoryCollapsed(
        isAddCategoryCollapsed => !isAddCategoryCollapsed
      );
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticles = async () => {
    try {
      const payload = {
        statusFilter: "All",
        searchFilter: "",
      };
      const response = await articlesApi.list(payload);
      setTotalDraftCount(response.data.drafted);
      setTotalPublishCount(response.data.published);
    } catch (err) {
      logger.error(err);
    }
  };

  const handleStatus = status => {
    setArticleFilterConstraint({
      ...articleFilterConstraint,
      status,
    });
  };

  const handleCategories = category => {
    if (articleFilterConstraint.category.includes(category)) {
      setArticleFilterConstraint({
        ...articleFilterConstraint,
        category: articleFilterConstraint.category.filter(
          item => item !== category
        ),
      });
    } else {
      setArticleFilterConstraint({
        ...articleFilterConstraint,
        category: [...articleFilterConstraint.category, category],
      });
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  return (
    <MenuBar showMenu title="Articles">
      <MenuBar.Block
        active={articleFilterConstraint.status === "All"}
        count={totalDraftCount + totalPublishCount}
        label="All"
        onClick={() => handleStatus("All")}
      />
      <MenuBar.Block
        active={articleFilterConstraint.status === "drafted"}
        count={totalDraftCount}
        label="Draft"
        onClick={() => handleStatus("drafted")}
      />
      <MenuBar.Block
        active={articleFilterConstraint.status === "published"}
        count={totalPublishCount}
        label="Published"
        onClick={() => handleStatus("published")}
      />
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () =>
              setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed),
          },
          {
            icon: isAddCategoryCollapsed ? Close : Plus,
            onClick: () =>
              setIsAddCategoryCollapsed(
                isAddCategoryCollapsed => !isAddCategoryCollapsed
              ),
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          Categories
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        collapse={isSearchCollapsed}
        value={searchCategory}
        onChange={e => setSearchCategory(e.target.value)}
        onCollapse={() => setIsSearchCollapsed(true)}
      />
      {isAddCategoryCollapsed && (
        <Create fetchCategoriesList={fetchCategories} />
      )}
      {categories
        .filter(category =>
          category.name
            .toLowerCase()
            .includes(searchCategory.toLocaleLowerCase())
        )
        .map(category => (
          <MenuBar.Block
            active={articleFilterConstraint.category.includes(category.id)}
            count={category.count}
            key={category.id}
            label={category.name}
            onClick={() => handleCategories(category.id)}
          />
        ))}
    </MenuBar>
  );
};

export default SideMenu;
