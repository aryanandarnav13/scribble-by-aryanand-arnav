import React, { useState, useEffect } from "react";

import { Accordion } from "@bigbinary/neetoui";
import { MenuBar, Header, Container } from "@bigbinary/neetoui/layouts";
import { Link } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

const EuiBody = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articleName, setArticleName] = useState("");
  const [articleCategory, setArticleCategory] = useState("");
  const [articlePublishDate, setArticlePublishDate] = useState("");
  const [articleBody, setArticleBody] = useState("");

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
        <Accordion defaultActiveKey={0}>
          {categories.map((category, idx) => (
            <Accordion.Item isOpen key={idx} title={category.name}>
              {articles.map(
                (article, index) =>
                  article.status === "Publish" &&
                  article.category === category.name && (
                    <Link
                      className="block h-8 hover:text-blue-600"
                      key={index}
                      onClick={() => {
                        setArticleName(article.title),
                          setArticleBody(article.body),
                          setArticleCategory(article.category),
                          setArticlePublishDate(article.date);
                      }}
                    >
                      {article.title}
                    </Link>
                  )
              )}
            </Accordion.Item>
          ))}
        </Accordion>
      </MenuBar>
      <Container>
        <Header title={articleName} />
        <div className="flex">
          <div className="max-w-7xl mb-8 bg-blue-200 px-2 text-indigo-600">
            {articleCategory}
          </div>
          <div className="ml-5 text-gray-500">{articlePublishDate}</div>
        </div>
        <div className="max-w-7xl px-2 ">{articleBody}</div>
      </Container>
    </div>
  );
};

export default EuiBody;
