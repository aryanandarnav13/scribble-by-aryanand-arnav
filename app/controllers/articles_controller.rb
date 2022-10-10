# frozen_string_literal: true

class ArticlesController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    articles = Article.all
    render status: :ok, json: { articles: articles }
  end

  def create
    article = Article.new(article_params)
    article.save!
    # respond_with_success(t("successfully_created"))
    render status: :ok, json: { notice: "article was successfully created", article: article }
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :category_id, :status)
    end
end
