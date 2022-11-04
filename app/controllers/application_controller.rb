# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiRescuable
  include ApiResponders
  include Authenticable

  private

    def current_site!
      @_current_site ||= Site.first
    end

    def current_user!
      current_site = current_site!
      @_current_user ||= current_site.users.first
    end
end
