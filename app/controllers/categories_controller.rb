# frozen_string_literal: true

class CategoriesController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :load_categories!, only: %i[show update destroy]
  before_action :current_user!, except: %i[new edit]

  def index
    @categories = @_current_user.categories.order("position ASC")
  end

  def create
    category = Category.new(category_params)
    category.save!
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def show
  end

  def update
    @category.update!(category_params)
  end

  def destroy
    if DestroyCategory.new(
      category_id: params[:id], new_category_id: category_params[:new_category_id],
      current_user: @_current_user).process
      respond_with_success(t("successfully_deleted", entity: "Category"))
    else
      respond_with_error(t("error_deleting", entity: "Category"))
    end
  end

  private

    def load_categories!
      @category = Category.find_by_id!(params[:id])
    end

    def category_params
      params.require(:category).permit(:id, :name, :position, :new_category_id, :user_id)
    end
end
