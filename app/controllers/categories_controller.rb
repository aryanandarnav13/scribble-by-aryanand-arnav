# frozen_string_literal: true

class CategoriesController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    categories = Category.all
    render status: :ok, json: { categories: categories }
  end

  def create
    category = Category.new(category_params)
    category.save!
    render status: :ok, json: { notice: "The category is successfully created" }
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
