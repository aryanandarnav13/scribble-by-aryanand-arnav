# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiRescuable
  include ApiResponders
  include Authenticable
  before_action :current_website
  # before_action :current_user

  private

    def current_website
      @_current_website ||= Website.first
    end

  # def current_user
  #   @_current_user = @_current_website.users.first
  # end
end
