# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  def index
    @published_articles = current_user.articles.where(status: "Publish")
    @published_articles = @published_articles.order("position ASC").page(params[:page_number])
    @published_articles_count = current_user.articles.where(status: "Publish").count
  end

  def show
    @article = current_user.articles.find_by!(slug: params[:slug])
    View.create!(article_id: @article.id)
    render
  end
end
