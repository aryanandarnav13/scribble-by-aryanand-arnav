# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    puts(login_params)
    unless current_website.authenticate(login_params[:password])
      puts("Not authenticated")
      respond_with_error("Incorrect credentials, try again.", :unauthorized)
    end
  end

  private

    def login_params
      puts("++++++++++++++++++++++++++++++")
      puts(params)
      params.require(:session).permit(:password)
    end
end
