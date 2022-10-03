import React, { useState } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";

const SideMenu = () => {
  const [isSearchOrAddCollapsed, setIsSearchOrAddCollapsed] = useState(true);

  return (
    <MenuBar showMenu title="Articles">
      <MenuBar.Block active count={0} label="All" />
      <MenuBar.Block count={0} label="Draft" />
      <MenuBar.Block count={0} label="Published" />
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () =>
              setIsSearchOrAddCollapsed(
                isSearchOrAddCollapsed => !isSearchOrAddCollapsed
              ),
          },
          {
            icon: Plus,
            onClick: () =>
              setIsSearchOrAddCollapsed(
                isSearchOrAddCollapsed => !isSearchOrAddCollapsed
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
        collapse={isSearchOrAddCollapsed}
        onCollapse={() => setIsSearchOrAddCollapsed(true)}
      />
      <MenuBar.Block count={0} label="Getting Started" />
      <MenuBar.Block count={0} label="Apps and Integration" />
      <MenuBar.Block count={0} label="Security and Privacy" />
      <MenuBar.Block count={0} label="Misc" />
    </MenuBar>
  );
};

export default SideMenu;
