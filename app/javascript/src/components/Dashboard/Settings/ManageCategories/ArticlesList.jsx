import React, { useState } from "react";

import { Clock } from "neetoicons";
import { Typography, Tag, Tooltip, Checkbox, Avatar } from "neetoui";
import { Scrollable } from "neetoui/layouts";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import articlesApi from "apis/articles";

import { calculateCreatedAgo, weekDaydateFormat } from "./utils";

const ArticlesList = ({
  articles,
  checkedArticle,
  setCheckedArticle,
  fetchArticles,
}) => {
  const [selectedArticle, setSelectedArticle] = useState("");

  const updateArticlePosition = async ({
    id,
    sourcePosition,
    destinationPosition,
  }) => {
    const [removed] = articles.splice(sourcePosition, 1);
    articles.splice(destinationPosition, 0, removed);
    const payload = {
      position: destinationPosition + 1,
    };
    try {
      await articlesApi.reorder(id, payload);
      await fetchArticles();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleArticles = article => {
    if (checkedArticle.article.includes(article)) {
      setCheckedArticle({
        ...checkedArticle,
        article: checkedArticle.article.filter(item => item !== article),
      });
    } else {
      setCheckedArticle({
        ...checkedArticle,
        article: [...checkedArticle.article, article],
      });
    }
  };

  const handleDragStart = item => {
    setSelectedArticle(item.draggableId);
  };

  const handleOnDragEnd = async item => {
    setSelectedArticle("");
    if (item.source.index === item.destination.index) return;

    if (!item.destination) return;

    await updateArticlePosition({
      id: item.draggableId,
      destinationPosition: item.destination.index,
      sourcePosition: item.source.index,
    });
  };

  return (
    <Scrollable>
      <DragDropContext
        onDragEnd={handleOnDragEnd}
        onDragStart={handleDragStart}
      >
        <Droppable droppableId="articlesList">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {articles.map((article, index) => (
                <Draggable
                  draggableId={article.id.toString()}
                  index={index}
                  key={article.id}
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className={
                        selectedArticle === article.id
                          ? "bg-gray-50"
                          : "white border-t"
                      }
                    >
                      <div className="neeto-ui-shadow-xs neeto-ui-rounded-none neeto-ui-border-gray-400 border mb-4 w-full space-y-2 p-5">
                        <div>
                          <Checkbox
                            id="checkbox_name_disabled"
                            onClick={() => handleArticles(article.id)}
                          />
                          <Typography className="mt-2" style="h4">
                            {article.title}
                          </Typography>
                        </div>
                        <div className="mb-2">
                          <Typography
                            className="truncate text-sm"
                            style="body2"
                          >
                            {article.body}
                          </Typography>
                        </div>
                        <hr />
                        <div className="mt-3 flex align-middle ">
                          <div className="item-center ml-auto flex space-x-2">
                            <Clock className="mt-2" size="20" />
                            <Tooltip
                              content={weekDaydateFormat(article.created_at)}
                              position="bottom"
                            >
                              <Typography className="mt-2" style="body3">
                                {`${
                                  article.status === "published"
                                    ? "Published"
                                    : "Drafted"
                                } ${calculateCreatedAgo(article.updated_at)} `}
                              </Typography>
                            </Tooltip>
                          </div>
                          <Avatar
                            className="ml-2 mt-1"
                            size="small"
                            user={{
                              name: article.author,
                            }}
                          />
                          <Tag
                            className="neeto-ui-rounded-none ml-2 bg-gray-200"
                            label={article.status}
                            type="solid"
                            style={
                              article.status === "published"
                                ? "info"
                                : "warning"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Scrollable>
  );
};
export default ArticlesList;
