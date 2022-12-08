# frozen_string_literal: true

require "test_helper"

class DestroyCategoryServiceTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
  end

  def test_should_delete_category_with_no_articles
    @service = DestroyCategoryService.new(
      category_id: @category.id, new_category_id: nil, current_user: @user)
    @service.process!

    assert_nil @user.categories.find_by_id(@category.id)
  end

  def test_should_move_articles_from_one_category_to_the_other
    @category1 = create(:category, user: @user)
    @category2 = create(:category, user: @user)
    @articles_in_category1 = create_list(:article, 10, category: @category1, user: @user)
    category1_articles_original_length = @category1.articles.length

    @service = DestroyCategoryService.new(
      category_id: @category1.id, new_category_id: @category2.id,
      current_user: @user)
    @service.process!

    assert_equal category1_articles_original_length, @category2.articles.length
  end

  def test_should_move_articles_to_general_if_only_one_category_remains
    @user.destroy
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @articles_in_category = create_list(:article, 10, category: @category, user: @user)
    category_articles_original_length = @category.articles.length

    @service = DestroyCategoryService.new(
      category_id: @category.id, new_category_id: nil,
      current_user: @user)
    @service.process!

    assert_equal "General", @user.categories.first.name
  end

  def test_should_not_delete_the_last_general_category
    @user.destroy
    @user = create(:user, site: @site)
    @category = create(:category, name: "General", user: @user)
    @articles_in_category = create_list(:article, 10, category: @category, user: @user)
    category_articles_original_length = @category.articles.length

    @service = DestroyCategoryService.new(
      category_id: @category.id, new_category_id: nil,
      current_user: @user)

    assert_nil @service.process!
  end
end
