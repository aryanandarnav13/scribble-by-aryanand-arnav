# frozen_string_literal: true

class Api::CategoriesController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :load_category!, only: %i[show update reorder]
  before_action :current_user!, except: %i[new edit]

  def index
    @categories = @_current_user.categories.order("position ASC")
  end

  def create
    category = Category.create!(category_params)
    category.save!
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def show
    render
  end

  def reorder
    @category.update!(category_position_params)
  end

  def update
    @category.update!(category_params)
  end

  def destroy
    if DestroyCategoryService.new(
      category_id: params[:id], new_category_id: params[:new_category_id],
      current_user: @_current_user).process
      respond_with_success(t("successfully_deleted", entity: "Category"))
    else
      respond_with_error(t("error_deleting", entity: "Category"))
    end
  end

  private

    def load_category!
      @category = Category.find(params[:payload][:id])
    end

    def category_params
      params.require(:payload).permit(:id, :name, :position, :new_category_id, :user_id)
    end

    def category_position_params
      params.require(:payload).permit(:position)
    end
end
