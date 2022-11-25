# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  def index
    @categories = current_user.categories.joins(:articles).where(articles: { status: "Publish" })
    @categories = @categories.order("position ASC").uniq
  end
end
