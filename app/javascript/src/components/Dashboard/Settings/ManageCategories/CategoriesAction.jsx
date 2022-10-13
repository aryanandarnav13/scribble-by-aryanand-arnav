import React, { useState, useEffect } from "react";

import { Reorder, Delete, Edit, Check, Close } from "@bigbinary/neeto-icons";
import { Typography, Button, Input } from "@bigbinary/neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

const List = ({ categories, fetchCategories }) => {
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateCategory = async () => {
    try {
      await categoriesApi.update({
        id: categoryId,
        payload: {
          name: categoryName,
        },
      });
      setCategoryId(0);
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <DragDropContext>
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
                            // onClick={() => {
                            //   destroyCategory(category);
                            // }}
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
