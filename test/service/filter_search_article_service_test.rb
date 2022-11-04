# frozen_string_literal: true

# require "test_helper"

# class FilterSearchArticleServiceTest < ActiveSupport::TestCase
#   def setup
#     @site = create(:site)
#     @user = create(:user, site: @site)
#     @category = create(:category, user: @user)
#     @article = create(:article, category: @category, user: @user)
#   end

#   def def test_user_can_get_all_articles
#     @service = FilterSearchArticleService.new(
#       articles: @article, statusFilter: "All", searchFilter: "", categoriesFilter: nil)
#     @service.process
#     assert_equal @service.articles, Article.all
#   end

  # def test_user_can_get_all_published_articles
  #   @service = FilterSearchArticleService.new(
  #     statusFilter: "Publish", searchFilter: "", articles: @article, categoriesFilter: nil)
  #   @service.process
  #   assert_equal @service.articles, Article.published
  # end

  # def test_user_can_get_all_draft_articles
  #   @service = FilterSearchArticleService.new(
  #     statusFilter: "Draft", searchFilter: "", articles: @article, categoriesFilter: nil)
  #   @service.process
  #   assert_equal @service.articles, Article.draft
  # end

  # def test_user_can_get_all_articles_by_category
  #   @service = FilterSearchArticleService.new(
  #     statusFilter: "All", searchFilter: "", articles: @article, categoriesFilter: @category.id)
  #   @service.process
  #   assert_equal @service.articles, Article.where(category_id: @category.id)
  # end
end
