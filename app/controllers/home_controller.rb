# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :redirect, only: %i[index]
  def index
    render
  end

  private

    def redirect
      frompath = request.path
      redirection = Redirection.find_by(frompath: frompath)
      if redirection
        redirect_to redirection.topath, status: :moved_permanently
      end
    end
end
