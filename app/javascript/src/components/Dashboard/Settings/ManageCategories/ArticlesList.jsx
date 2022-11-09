import React, { useState } from "react";

import { Clock } from "neetoicons";
import { Typography, Tag, Tooltip, Checkbox } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import articlesApi from "apis/articles";

import { calculateCreatedAgo, weekDaydateFormat } from "./utils";

const ArticlesList = ({ articles, categoryToDisplay, fetchArticles }) => {
  const [selectedArticle, setSelectedArticle] = useState("");

  const updateArticlePosition = async ({
    slug,
    sourcePosition,
    destinationPosition,
  }) => {
    const [removed] = articles.splice(sourcePosition, 1);
    articles.splice(destinationPosition, 0, removed);
    const payload = {
      title: selectedArticle.title,
      body: selectedArticle.body,
      category_id: selectedArticle.category_id,
      status: selectedArticle.status,
      user_id: selectedArticle.user_id,
      position: destinationPosition + 1,
    };
    try {
      await articlesApi.update(slug, payload);
      await fetchArticles();
    } catch (error) {
      logger.error(error);
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
      slug: item.draggableId,
      destinationPosition: item.destination.index,
      sourcePosition: item.source.index,
    });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleDragStart}>
      <Droppable droppableId="articlesList">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {articles.map(
              (article, index) =>
                article.category === categoryToDisplay.name && (
                  <Draggable
                    draggableId={article.slug.toString()}
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
                            <Checkbox id="checkbox_name_disabled" />
                            <Typography className="mt-2" style="h4">
                              {article.title}
                            </Typography>
                          </div>
                          <div className="mb-2">
                            <Typography className="text-sm" style="body2">
                              {article.body}
                            </Typography>
                          </div>
                          <hr />
                          <div className="mt-3 flex align-middle ">
                            <div className="item-center ml-auto flex space-x-2">
                              <Clock size="20" />
                              <Tooltip
                                content={weekDaydateFormat(article.created_at)}
                                position="bottom"
                              >
                                <Typography style="body3">
                                  {`Created ${calculateCreatedAgo(
                                    article.created_at
                                  )} `}
                                </Typography>
                              </Tooltip>
                            </div>
                            <Tag
                              className="neeto-ui-rounded-none ml-2 bg-gray-200"
                              label={article.status}
                              type="solid"
                              style={
                                article.status === "Publish"
                                  ? "info"
                                  : "warning"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default ArticlesList;
