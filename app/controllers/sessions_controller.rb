# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @website = Website.first
    unless @website.authenticate(login_params[:password])
      render status: :unauthorized, json: { error: "incorrect_credentials" }
    end
  end

  private

    def login_params
      params.require(:login).permit(:password)
    end
end
