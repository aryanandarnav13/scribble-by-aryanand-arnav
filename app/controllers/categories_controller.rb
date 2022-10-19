# frozen_string_literal: true

class CategoriesController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :load_categories!, only: %i[show update destroy]

  def index
    # categories = Category.all.order("position ASC")
    @categories = Category.all.order("position ASC")
    render status: :ok, json: { categories: @categories }
  end

  def create
    category = Category.new(category_params)
    category.save!
    render status: :ok, json: { notice: "The category is successfully created" }
  end

  def show
  end

  def update
    @category.update!(category_params)
    render status: :ok, json: { notice: "This category is successfully updated" }
  end

  def destroy
    if category_params[:new_category_id] === nil
      new_category = Category.create!({ name: "General" })
      Article.where(category_id: params[:id]).update_all(category_id: new_category.id)
    elsif category_params[:new_category_id] != "none"
      Article.where(category_id: params[:id]).update_all(category_id: category_params[:new_category_id])
    end
    @category = Category.find_by!(id: params[:id])
    @category.destroy!
    render status: :ok, json: { notice: "This category is successfully deleted" }
  end

  private

    def load_categories!
      @category = Category.find_by_id!(params[:id])
    end

    def category_params
      params.require(:category).permit(:id, :name, :position, :new_category_id)
    end
end
