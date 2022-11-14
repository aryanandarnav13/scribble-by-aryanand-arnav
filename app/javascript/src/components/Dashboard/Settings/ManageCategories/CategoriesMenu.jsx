import React, { useState } from "react";

import { MenuVertical, Plus } from "neetoicons";
import { ActionDropdown, Typography, Button, Tooltip } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

import CategoryDeleteModal from "./CategoryDeleteModal";
import Create from "./Pane/Create";
import Edit from "./Pane/Edit";

const CategoriesMenu = ({
  articles,
  categories,
  categoryToDisplay,
  setCategoryToDisplay,
  setCheckedArticle,
  fetchCategories,
}) => {
  const [showNewCategoryPane, setShowNewCategoryPane] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { Menu, MenuItem, Divider } = ActionDropdown;
  const [showAlert, setShowAlert] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToUpdateTo, setCategoryToUpdateTo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const updateCategoryPosition = async ({
    id,
    sourcePosition,
    destinationPosition,
  }) => {
    const [removed] = categories.splice(sourcePosition, 1);
    categories.splice(destinationPosition, 0, removed);

    try {
      await categoriesApi.reorder({
        payload: {
          position: destinationPosition + 1,
          id,
        },
        quiet: true,
      });
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const destroyCategory = async category => {
    if (
      articles?.filter(item => item?.category === category?.name)?.length ===
        0 ||
      (category?.name === "General" && categories?.length === 1)
    ) {
      try {
        await categoriesApi.destroy({
          payload: {
            id: category.id,
          },
        });
      } catch (error) {
        logger.error(error);
      } finally {
        fetchCategories();
      }
    } else {
      setShowAlert(true);
      setCategoryToDelete(category);
    }
  };

  const filteredCategories = () => {
    const filteredCategoriesArray = [];
    categories.map(category => {
      if (category.id !== categoryToDelete?.id) {
        filteredCategoriesArray.push({
          value: category.id,
          label: category.name,
        });
      }
    });

    return filteredCategoriesArray;
  };

  const switchAndDeleteCategory = async () => {
    if (categories.length === 1) {
      try {
        await categoriesApi.destroy({
          payload: {
            id: categoryToDelete.id,
          },
        });
        setShowAlert(false);
      } catch (error) {
        logger.log(error);
      } finally {
        fetchCategories();
      }
    } else {
      try {
        await categoriesApi.destroy({
          payload: {
            id: categoryToDelete.id,
            new_category_id: categoryToUpdateTo.value,
          },
        });
        setShowAlert(false);
      } catch (error) {
        logger.error(error);
      } finally {
        fetchCategories();
      }
    }
  };

  const handleDragStart = item => {
    setSelectedCategory(item.draggableId);
  };

  const handleOnDragEnd = async item => {
    setSelectedCategory("");
    if (item.source.index === item.destination.index) return;

    if (!item.destination) return;

    await updateCategoryPosition({
      id: item.draggableId,
      destinationPosition: item.destination.index,
      sourcePosition: item.source.index,
    });
  };

  return (
    <>
      <div
        className="h-screen overflow-y-auto border-l-2 border-r-2 p-8"
        style={{ width: "324px" }}
      >
        <div className="flex justify-between pb-4">
          <div className=" text-xl font-semibold">Manage categories</div>
          <Tooltip content="Create a new category" position="bottom">
            <Button
              className="mr-2"
              icon={Plus}
              onClick={() => setShowNewCategoryPane(true)}
            />
          </Tooltip>
        </div>
        <DragDropContext
          onDragEnd={handleOnDragEnd}
          onDragStart={handleDragStart}
        >
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
                        <div
                          className={
                            categoryToDisplay.id === category.id
                              ? "flex items-center justify-between rounded-md  bg-blue-100 py-3"
                              : "flex items-center justify-between rounded-md py-3 hover:bg-gray-100"
                          }
                          onClick={() => {
                            setCategoryToDisplay(category);
                            setCheckedArticle({
                              article: [],
                            });
                          }}
                        >
                          <div className="items-center">
                            <Typography
                              className="ml-2"
                              size="body2"
                              weight="medium"
                            >
                              {category.name}
                            </Typography>
                            <div className="ml-2 text-xs">
                              {category.count} Articles
                            </div>
                          </div>
                          <div className="pr-2">
                            <ActionDropdown
                              buttonStyle="neeto-ui-white"
                              dropdownProps={{ icon: MenuVertical }}
                            >
                              <Menu>
                                <MenuItem.Button
                                  onClick={() => {
                                    setShowNewCategoryPane(true);
                                    setCategoryToEdit(category);
                                    setIsEdit(true);
                                  }}
                                >
                                  Edit
                                </MenuItem.Button>
                                <Divider />
                                <MenuItem.Button
                                  style="danger"
                                  onClick={() => {
                                    destroyCategory(category);
                                  }}
                                >
                                  Delete
                                </MenuItem.Button>
                              </Menu>
                            </ActionDropdown>
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
      </div>
      {isEdit ? (
        <Edit
          category={categoryToEdit}
          fetchCategories={fetchCategories}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setShowPane={setShowNewCategoryPane}
          showPane={showNewCategoryPane}
        />
      ) : (
        <Create
          fetchCategories={fetchCategories}
          setShowPane={setShowNewCategoryPane}
          showPane={showNewCategoryPane}
        />
      )}
      <CategoryDeleteModal
        articles={articles}
        categories={categories}
        categoryToDelete={categoryToDelete}
        filteredCategories={filteredCategories}
        setCategoryToUpdateTo={setCategoryToUpdateTo}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        switchAndDeleteCategory={switchAndDeleteCategory}
      />
    </>
  );
};
export default CategoriesMenu;
