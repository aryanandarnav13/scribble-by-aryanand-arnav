# frozen_string_literal: true

class Api::CategoriesController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :load_category!, only: %i[update reorder]

  def index
    @categories = current_user.categories.order("position ASC")
  end

  def create
    current_user.categories.create!(category_params)
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def reorder
    @category.insert_at(params[:payload][:position])
  end

  def update
    @category.update!(category_params)
  end

  def destroy
    if DestroyCategoryService.new(
      category_id: params[:id], new_category_id: params[:new_category_id],
      current_user: current_user).process!
      respond_with_success(t("successfully_deleted", entity: "Category"))
    else
      respond_with_error(t("error_deleting", entity: "Category"))
    end
  end

  private

    def load_category!
      @category = current_user.categories.find(params[:payload][:id])
    end

    def category_params
      params.require(:payload).permit(:id, :name, :position, :new_category_id, :user_id)
    end
end
