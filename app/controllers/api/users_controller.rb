# frozen_string_literal: true

class Api::UsersController < ApplicationController
  def index
    @user = current_user
  end
end
