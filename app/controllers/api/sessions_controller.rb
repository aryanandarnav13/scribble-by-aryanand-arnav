# frozen_string_literal: true

class Api::SessionsController < ApplicationController
  before_action :current_site!, except: %i[edit]
  def create
    unless @_current_site.authenticate(login_params[:password])
      respond_with_error("Incorrect credentials", :unauthorized)
    end
  end

  private

    def login_params
      params.require(:session).permit(:password)
    end
end
