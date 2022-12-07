# frozen_string_literal: true

class Api::ArticleVersionsController < ApplicationController
  before_action :load_article!, only: %i[update]

  def update
    RestoreArticleService.new(@article, params[:version_at], params[:restored_at], current_user).process
    respond_with_success(t("successfully_restored", entity: "Article"))
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end
end
