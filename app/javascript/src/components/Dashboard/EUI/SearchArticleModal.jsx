import React, { useState } from "react";

import { Search, DownArrow, UpArrow } from "@bigbinary/neeto-icons";
import { Modal, Input } from "neetoui";
import { useHistory } from "react-router-dom";

const SearchArticleModal = ({ showModal, setShowModal, articles }) => {
  const [searchArticle, setSearchArticle] = useState("");
  const history = useHistory();

  const searchArticleWithTitle = (articles, searchArticle) =>
    articles.filter(article => {
      if (searchArticle !== "") {
        return article?.title
          ?.toLowerCase()
          ?.includes(searchArticle?.toLowerCase());
      }

      return article;
    });

  const handleSearchResultOnClick = slug => {
    history.push(`/preview/${slug}`);
    setShowModal(false);
  };

  return (
    <Modal
      closeButton={false}
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Input
        className="m-auto w-full"
        placeholder="Search for an article."
        prefix={<Search />}
        value={searchArticle}
        onChange={e => setSearchArticle(e.target.value)}
      />
      <div className="border-gray-1 w-full ">
        {searchArticle &&
          searchArticleWithTitle(articles, searchArticle).map(article => (
            <div
              className="flex cursor-pointer flex-row items-center justify-between border-t-2 p-2 hover:bg-gray-100 "
              key={article.slug}
              onClick={() => {
                setSearchArticle("");
                handleSearchResultOnClick(article.slug);
              }}
            >
              {article.title}
            </div>
          ))}
        <div className="flex flex-row items-center  border-t-2 bg-gray-200 p-2 ">
          <div className="flex">
            <UpArrow size={16} />
            <DownArrow size={16} />
            <div className="text-xs">to navigate</div>
          </div>
          <div className="py- ml-4 mr-1 rounded-full border-gray-500 bg-gray-400 p-1 px-1 text-xs">
            Enter
          </div>
          <div className="text-xs">to select</div>
        </div>
      </div>
    </Modal>
  );
};

export default SearchArticleModal;
