# frozen_string_literal: true

class SessionsController < ApplicationController
  before_action :current_website!, except: %i[edit]
  def create
    unless @_current_website.authenticate(login_params[:password])
      respond_with_error("Incorrect credentials", :unauthorized)
    end
  end

  private

    def login_params
      params.require(:session).permit(:password)
    end
end
