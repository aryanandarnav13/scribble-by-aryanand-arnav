# frozen_string_literal: true

class CategoriesController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :load_categories!, only: %i[show update destroy]

  def index
    categories = Category.all.order("position ASC")
    render status: :ok, json: { categories: categories }
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
    @category.destroy!
    render status: :ok, json: { notice: "This category is successfully deleted" }
  end

  def changeCategory
  end

  private

    def load_categories!
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:id, :name, :position)
    end
end
