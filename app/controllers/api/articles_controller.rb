# frozen_string_literal: true

class Api::ArticlesController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :load_article!, only: %i[show update destroy reorder restore]

  def index
    @articles = current_user.articles.order("position ASC").page(params[:page_number])
    @articles = FilterSearchArticleService.new(
      articles: @articles, categoriesFilter: params[:categoriesFilter],
      searchFilter: params[:searchFilter], statusFilter: params[:statusFilter]).process
    @published_articles_count = current_user.articles.where(status: "Publish").count
    @drafted_articles_count = current_user.articles.where(status: "Draft").count
  end

  def create
    article = current_user.articles.create!(article_params)
    article.save!
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
    render
  end

  def reorder
    @article.insert_at(params[:position])
  end

  def transfer
    TransferArticleService.new(
      article_ids: params[:article_ids], new_category_id: params[:new_category_id],
      current_user: current_user).process
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.remove_from_list
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  def restore
    RestoreArticleService.new(@article, params[:version_at], current_user).process
    respond_with_success(t("successfully_restored", entity: "Article"))
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def article_params
      params.require(:article).permit(
        :title, :position, :body, :category_id, :status, :user_id, :article_ids,
        :new_category_id)
    end
end
