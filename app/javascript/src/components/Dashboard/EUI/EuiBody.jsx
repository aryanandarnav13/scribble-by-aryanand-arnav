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
  const { url, path } = useRouteMatch();
  const [selectedCategoryPosition, setSelectedCategoryPosition] = useState(0);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const slug = window.location.pathname.split("/")[2];

  const handleActiveCategory = () => {
    const activeArticle = articles.find(article => article.slug === slug);
    if (activeArticle) {
      const activeCategory = categories.find(
        category => category.name === activeArticle.category
      );
      setSelectedCategoryPosition(activeCategory?.position);
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
        <Accordion defaultActiveKey={selectedCategoryPosition - 1}>
          {categories.map((category, idx) => (
            <Accordion.Item isOpen key={idx} title={category.name}>
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
