# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiRescuable
  include ApiResponders
  include Authenticable

  private

    def current_website!
      @_current_website ||= Website.first
    end

    def current_user!
      current_website = current_website!
      @_current_user ||= current_website.users.first
    end
end
