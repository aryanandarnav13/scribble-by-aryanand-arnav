# frozen_string_literal: true

require "test_helper"

class FilterSearchArticleServiceTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_user_can_get_all_articles
    @article = create(:article, category: @category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @service = FilterSearchArticleService.new(
      articles: @article, statusFilter: "All", searchFilter: "", categoriesFilter: nil)
    @service.process
    assert_equal @service.articles.class.count, @user.articles.count
  end

  def test_user_can_searched_articles
    @article1 = create(:article, category: @category, user: @user, title: "test1")
    @article2 = create(:article, category: @category, user: @user, title: "test2")
    @service = FilterSearchArticleService.new(
      articles: @user.articles, statusFilter: "All", searchFilter: "test2", categoriesFilter: nil)
    @service.process
    assert_equal @service.articles.count, 1
  end
end
