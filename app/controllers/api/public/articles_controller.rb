# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :authenticate_request!

  def index
    published_articles = current_user.articles.published
    @published_articles = published_articles.order("position ASC").page(params[:page_number])
  end

  def show
    @article = current_user.articles.find_by!(slug: params[:slug])
    @article.article_visits.create!
  end
end
