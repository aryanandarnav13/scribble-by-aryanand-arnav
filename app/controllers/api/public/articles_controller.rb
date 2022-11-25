# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  def index
    @published_articles = current_user.articles.where(status: "Publish").order("position ASC")
  end

  def show
    @article = current_user.articles.find_by!(slug: params[:slug])
    @article.increment!(:views)
    render
  end
end
