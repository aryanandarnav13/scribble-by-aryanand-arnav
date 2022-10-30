# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Authenticable
  include ApiResponders
  include ApiRescuable

  before_action :current_website

  private

    def current_website
      @_current_website ||= Website.first
    end
end
