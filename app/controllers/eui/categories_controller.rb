# frozen_string_literal: true

class Eui::CategoriesController < ApplicationController
  def index
    @categories = Category.all.order("position ASC")
    # @categories = @_current_user.categories.order("position ASC")
  end
end
