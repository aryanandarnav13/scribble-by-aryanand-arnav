# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :current_user!, except: %i[new edit]

  def index
    @categories = @_current_user.categories.order("position ASC")
  end
end
