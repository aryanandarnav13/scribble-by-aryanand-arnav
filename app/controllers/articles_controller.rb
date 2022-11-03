# frozen_string_literal: true

class ArticlesController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :load_articles!, only: %i[show update destroy]
  before_action :current_user!, except: %i[new edit]

  def index
    @articles = @_current_user.articles
    @articles = FilterSearchArticle.new(
      articles: @articles, categoriesFilter: params[:categoriesFilter],
      searchFilter: params[:searchFilter], statusFilter: params[:statusFilter]).process
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  private

    def load_articles!
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit(:title, :body, :category_id, :status, :user_id)
    end
end
