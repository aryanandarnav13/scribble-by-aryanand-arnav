# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
  end

  def test_category_should_not_be_valid_without_name
    @category.name = ""
    assert_not @category.valid?
  end

  def test_category_should_not_be_valid_without_user
    @category.user = nil
    assert_not @category.valid?
  end

  def user_cannot_create_category_with_same_name
    @category1 = create(:category, user: @user)
    @category2 = build(:category, user: @user, name: @category1.name)
    assert_not @category2.valid?
  end

  def user_cannot_create_category_without_name
    @category = build(:category, user: @user, name: "")
    assert_not @category.valid?
  end

  def user_cannot_create_category_without_user
    @category = build(:category, user: nil)
    assert_not @category.valid?
  end

  def test_category_should_be_deleted_when_user_is_deleted
    @user.destroy
    assert_empty @user.categories
  end

  def test_should_not_create_category_with_same_name
    @category1 = create(:category, user: @user)
    @category2 = build(:category, user: @user, name: @category1.name)
    assert_not @category2.valid?
  end
end
