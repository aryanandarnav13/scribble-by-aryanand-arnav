# frozen_string_literal: true

class ArticlesController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :load_articles!, only: %i[show update destroy]

  def index
    @articles = Article.all
  end

  def create
    article = Article.new(article_params)
    article.save!
    render status: :ok, json: { notice: "The article is successfully created", article: article }
  end

  def show
  end

  def update
    @article.update!(article_params)
    render status: :ok, json: { notice: "This article is successfully updated" }
  end

  def destroy
    @article.destroy!
    render status: :ok, json: { notice: "This article is successfully deleted" }
  end

  private

    def load_articles!
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit(:title, :body, :category_id, :status, :user_id)
    end
end
