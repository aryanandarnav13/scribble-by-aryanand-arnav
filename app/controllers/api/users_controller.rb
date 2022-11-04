# frozen_string_literal: true

class Api::UsersController < ApplicationController
  before_action :current_user!, except: %i[new edit]

  def index
    user = @_current_user
  end
end
