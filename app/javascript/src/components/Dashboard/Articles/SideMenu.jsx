import React, { useState, useEffect } from "react";

import { Search, Plus, Close } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Create from "./NewCategory/Create";

const SideMenu = () => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCategoryCollapsed, setIsAddCategoryCollapsed] = useState(true);
  const [draftCount, setDraftCount] = useState(0);
  const [publishCount, setPublishCount] = useState(0);

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      const {
        data: { draft, publish },
      } = await articlesApi.list();

      setCategories(categories);
      setDraftCount(draft);
      setPublishCount(publish);
      setIsAddCategoryCollapsed(
        isAddCategoryCollapsed => !isAddCategoryCollapsed
      );
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <MenuBar showMenu title="Articles">
      <MenuBar.Block active count={draftCount + publishCount} label="All" />
      <MenuBar.Block count={draftCount} label="Draft" />
      <MenuBar.Block count={publishCount} label="Published" />
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
        onCollapse={() => setIsSearchCollapsed(true)}
      />
      {isAddCategoryCollapsed && (
        <Create fetchCategoriesList={fetchCategories} />
      )}
      {categories.map(({ name, id }) => (
        <MenuBar.Block count={0} key={id} label={name} />
      ))}
    </MenuBar>
  );
};

export default SideMenu;
