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

  def test_user_can_get_searched_articles
    @article1 = create(:article, category: @category, user: @user, title: "test1")
    @article2 = create(:article, category: @category, user: @user, title: "test2")
    @service = FilterSearchArticleService.new(
      articles: @user.articles, statusFilter: "All", searchFilter: "test2", categoriesFilter: nil)
    @service.process
    assert_equal @service.articles[0].title, "test2"
  end

  def test_user_can_get_articles_by_status
    @article1 = create(:article, category: @category, user: @user, status: "published")
    @article2 = create(:article, category: @category, user: @user, status: "drafted")
    @service = FilterSearchArticleService.new(
      articles: @user.articles, statusFilter: "published", searchFilter: "", categoriesFilter: nil)
    @service.process
    assert_equal @service.articles[0].status, "published"
  end

  def test_user_can_get_articles_by_category
    @category1 = create(:category, user: @user, name: "test1")
    @category2 = create(:category, user: @user, name: "test2")
    @article1 = create(:article, category: @category1, user: @user)
    @article2 = create(:article, category: @category2, user: @user)
    @service = FilterSearchArticleService.new(
      articles: @user.articles, statusFilter: "All", searchFilter: "", categoriesFilter: [@category1.id])
    @service.process
    assert_equal @service.articles[0].category.name, "test1"
  end
end
