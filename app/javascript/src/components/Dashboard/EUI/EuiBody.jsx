import React, { useState, useEffect } from "react";

import { Accordion } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";
import { NavLink, Switch, Route, useRouteMatch } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Show from "./Show";

const EuiBody = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const { url, path } = useRouteMatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchCategoriesAndArticles = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      const {
        data: { articles },
      } = await articlesApi.list();
      setCategories(categories);
      setArticles(articles);
      articles.forEach((article, index) => {
        if (article.slug === window.location.pathname.split("/")[2]) {
          setActiveIndex(index);
        }
      });
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategoriesAndArticles();
  }, []);

  return (
    <div className="flex">
      <MenuBar showMenu>
        <Accordion defaultActiveKey={activeIndex}>
          {categories.map((category, idx) => (
            <Accordion.Item isOpen key={idx} title={category.name}>
              {articles.map(
                (article, index) =>
                  article.status === "Publish" &&
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
            <Show
              articleTitle={article.title}
              body={article.body}
              categoryTitle={article.category}
              publishedDate={article.date}
            />
          </Route>
        ))}
        {/* <Redirect exact from="/public" to={`public/${defaultPath}`} /> */}
      </Switch>
    </div>
  );
};

export default EuiBody;
