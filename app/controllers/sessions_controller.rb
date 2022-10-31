# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @current_site = current_website
    unless current_website.authenticate(login_params[:password])
      respond_with_error("Incorrect credentials", :unauthorized)
    end
  end

  private

    def login_params
      params.require(:session).permit(:password)
    end
end
