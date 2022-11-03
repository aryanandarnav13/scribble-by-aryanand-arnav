# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :current_user!, except: %i[new edit]

  def index
    user = @_current_user
  end
end
