# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show]
  before_action :current_user!, except: %i[new edit]

  def index
    @articles = @_current_user.articles.order("position ASC")
  end

  private

    def load_article!
      @article = @_current_user.articles.find(params[:id])
    end
end
