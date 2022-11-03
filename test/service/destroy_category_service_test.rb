# frozen_string_literal: true

require "test_helper"

class DestroyCategoryServiceTest < ActiveSupport::TestCase
  def setup
    @website = create(:website)
    @user = create(:user, website: @website)
    @category = create(:category, user: @user)
  end

  def test_should_delete_category_with_no_articles
    @service = DestroyCategoryService.new(
      category_id: @category.id, new_category_id: nil, current_user: @user)
    @service.process
    assert_nil Category.find_by_id(@category.id)
  end

  def test_should_move_articles_from_one_category_to_the_other
    @category1 = create(:category, user: @user)
    @category2 = create(:category, user: @user)

    @articles_in_category1 = create_list(:article, 10, category: @category1, user: @user)
    category1_articles_original_length = @category1.articles.length

    @service = DestroyCategoryService.new(
      category_id: @category1.id, new_category_id: @category2.id,
      current_user: @user)
    @service.process
    assert_equal category1_articles_original_length, @category2.articles.length
  end
end
