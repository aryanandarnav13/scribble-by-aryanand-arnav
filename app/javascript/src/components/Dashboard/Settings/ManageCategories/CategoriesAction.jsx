import React, { useState } from "react";

import { Reorder, Delete, Edit, Check, Close } from "neetoicons";
import { Typography, Button, Input } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

const List = ({
  articles,
  categories,
  users,
  fetchCategories,
  setShowAlert,
  setCategoryToDelete,
}) => {
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const updateCategory = async () => {
    try {
      await categoriesApi.update({
        id: categoryId,
        payload: {
          name: categoryName,
          user_id: users.id,
        },
      });
      setCategoryId(0);
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const updateCategoryPosition = async ({ id, position }) => {
    try {
      await categoriesApi.update({
        id,
        payload: {
          position,
        },
      });
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDragStart = item => {
    setSelectedCategory(item.draggableId);
  };

  const handleOnDragEnd = item => {
    setSelectedCategory("");
    if (item.source.index === item.destination.index) return;

    if (!item.destination) return;

    updateCategoryPosition({
      id: item.draggableId,
      position: item.destination.index + 1,
    });
  };

  const destroyCategory = async category => {
    if (
      articles?.filter(item => item.category === category?.name).length === 0
    ) {
      try {
        await categoriesApi.destroy(category.id, {
          id: category.id,
        });
        await fetchCategories();
      } catch (error) {
        logger.error(error);
      }
    } else {
      setShowAlert(true);
      setCategoryToDelete(category);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleDragStart}>
      <Droppable droppableId="categoriesList">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {categories.map((category, index) => (
              <Draggable
                draggableId={category.id.toString()}
                index={index}
                key={category.id}
              >
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    className={
                      selectedCategory === category.id
                        ? "bg-gray-50"
                        : "white border-t"
                    }
                  >
                    {categoryId === category.id ? (
                      <div className="bg-gray-50 flex items-center  justify-between py-3 px-1">
                        <div className="flex items-center">
                          <Reorder />
                          <Input
                            autoFocus
                            className="ml-2 block w-full"
                            maxLength={35}
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center">
                          <Button
                            className="ml-2"
                            icon={Check}
                            style="text"
                            onClick={() => updateCategory()}
                          />
                          <Button
                            className="ml-2"
                            icon={Close}
                            style="text"
                            onClick={() => {
                              setCategoryId(0);
                            }}
                          />
                          {provided.placeholder}
                        </div>
                        {provided.placeholder}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center">
                          <Reorder />
                          <Typography
                            className="ml-2"
                            size="body2"
                            weight="medium"
                          >
                            {category.name}
                          </Typography>
                        </div>
                        <div className="flex items-center">
                          <Button
                            icon={Delete}
                            style="text"
                            onClick={() => {
                              destroyCategory(category);
                            }}
                          />
                          <Button
                            className="ml-2"
                            icon={Edit}
                            style="text"
                            onClick={() => {
                              setCategoryId(category.id);
                              setCategoryName(category.name);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
