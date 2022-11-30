# frozen_string_literal: true

require "test_helper"

class Api::Public::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
  end

  def test_user_should_get_all_categories
    get api_categories_path, headers: headers
    assert_response :success
  end
end
