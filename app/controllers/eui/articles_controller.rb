# frozen_string_literal: true

class Eui::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show]

  def index
    @articles = Article.all
    # @articles = @_current_user.articles
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:id])
    end
end
