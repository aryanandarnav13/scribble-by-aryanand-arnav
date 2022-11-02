# frozen_string_literal: true

class Public::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show]
  before_action :current_user!, except: %i[new edit]

  def index
    @articles = @_current_user.articles
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:id])
    end
end
