# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :authenticate_request!

  def index
    categories = current_user.categories.joins(:articles).where(articles: { status: "published" })
    @categories = categories.order("position ASC").uniq
  end
end
