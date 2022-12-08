import React, { useState } from "react";

import { UpArrow, DownArrow } from "neetoicons";
import { Modal, Select } from "neetoui";
import { useHistory } from "react-router-dom";

const SearchArticleModal = ({ showModal, setShowModal, articles }) => {
  const [searchArticle, setSearchArticle] = useState("");
  const history = useHistory();

  const handleSearchResultOnClick = slug => {
    history.push(`/preview/${slug}`);
    setShowModal(false);
  };

  return (
    <Modal
      closeButton={false}
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
        setSearchArticle("");
      }}
    >
      <Select
        defaultMenuIsOpen
        isClearable
        className="px-2"
        name="ValueList"
        placeholder="Select an option"
        value={searchArticle}
        label={
          <div className="ml-16 flex flex-row items-center p-2">
            <div className="flex">
              <UpArrow className="bg-gray-400" size={16} />
              <DownArrow className="bg-gray-400" size={16} />
              <div className="ml-2 text-xs">to navigate</div>
            </div>
            <div className="py- ml-4 mr-1 border-gray-500 bg-gray-400 p-1 px-1 text-xs">
              Enter
            </div>
            <div className="text-xs">to select</div>
            <div className="py- ml-4 mr-1 border-gray-500 bg-gray-400 p-1 px-1 text-xs">
              Esc
            </div>
            <div className="text-xs">to cancel</div>
          </div>
        }
        options={articles.map(article => ({
          label: article.title,
          value: article.slug,
        }))}
        onChange={option => handleSearchResultOnClick(option.value)}
        onInputChange={e => setSearchArticle(e)}
      />
    </Modal>
  );
};

export default SearchArticleModal;
