import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { useMutation } from "@tanstack/react-query";
import { Search, Plus, Close } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { assoc } from "ramda";

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

  const { mutate: fetchCategories, isLoading } = useMutation(
    async () => {
      const response = await categoriesApi.list();

      return response.data.categories;
    },
    {
      onSuccess: data => {
        setCategories(data);
        setIsAddCategoryCollapsed(
          isAddCategoryCollapsed => !isAddCategoryCollapsed
        );
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  const { mutate: fetchArticles } = useMutation(
    async () => {
      const payload = {
        statusFilter: "All",
        searchFilter: "",
      };

      const { data } = await articlesApi.list(payload);

      return data;
    },
    {
      onSuccess: data => {
        setTotalDraftCount(data.drafted);
        setTotalPublishCount(data.published);
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  const handleStatus = status => {
    setArticleFilterConstraint(
      assoc("status", status, articleFilterConstraint)
    );
  };

  const handleCategories = category => {
    if (articleFilterConstraint.category.includes(category)) {
      const filterArticleWithCategory = {
        ...articleFilterConstraint,
        category: articleFilterConstraint.category.filter(
          item => item !== category
        ),
      };
      setArticleFilterConstraint(filterArticleWithCategory);
    } else {
      const filterArticleWithoutCategory = {
        ...articleFilterConstraint,
        category: [...articleFilterConstraint.category, category],
      };
      setArticleFilterConstraint(filterArticleWithoutCategory);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

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
