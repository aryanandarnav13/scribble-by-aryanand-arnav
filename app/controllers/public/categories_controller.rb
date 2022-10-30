# frozen_string_literal: true

class Public::CategoriesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: :index
  def index
    @categories = Category.all.order("position ASC")
  end
end
