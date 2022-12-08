import React, { useState, useEffect } from "react";

import { Accordion, PageLoader } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import {
  useRouteMatch,
  useHistory,
  NavLink,
  Switch,
  Route,
} from "react-router-dom";

import Show from "./Show";

const EuiBody = ({ articles, categories }) => {
  const [selectedCategoryPosition, setSelectedCategoryPosition] = useState(0);
  const [loading, setLoading] = useState(true);

  const { url, path } = useRouteMatch();
  const history = useHistory();
  const slug = window.location.pathname.split("/")[2];

  const handleActiveCategory = () => {
    const activeArticle = articles.find(article => article.slug === slug);
    if (activeArticle) {
      const activeCategoryPosition = categories.findIndex(
        category => category.name === activeArticle.category
      );

      setSelectedCategoryPosition(activeCategoryPosition);
    } else if (articles && articles.length > 0) {
      history.push(`${url}/${articles[0].slug}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleActiveCategory();
  });

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex">
      <MenuBar showMenu>
        <Accordion defaultActiveKey={selectedCategoryPosition}>
          {categories.map(category => (
            <Accordion.Item isOpen key={category.id} title={category.name}>
              {articles.map(
                (article, index) =>
                  article.category === category.name && (
                    <NavLink
                      activeClassName="text-indigo-500"
                      className="block h-8 hover:text-blue-600"
                      key={index}
                      to={`${url}/${article.slug}`}
                    >
                      {article.title}
                    </NavLink>
                  )
              )}
            </Accordion.Item>
          ))}
        </Accordion>
      </MenuBar>
      <Switch>
        {articles.map((article, index) => (
          <Route key={index} path={`${path}/${article.slug}`}>
            <Show slug={slug} />
          </Route>
        ))}
      </Switch>
    </div>
  );
};

export default EuiBody;
