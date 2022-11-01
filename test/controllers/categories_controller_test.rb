# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @website = create(:website)
    @user = create(:user, website: @website)
    @category = create(:category, user: @user)
  end

  def test_user_can_create_valid_category
    post categories_url,
      params: {
        category:
        {
          name: "test category", user_id: @user.id
        }
      },
      headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Category")
  end

  def test_user_can_update_any_category
    new_name = "updated name"
    category_params = {
      category:
            {
              name: new_name, user_id: @user.id
            }
    }
    put category_path(@category.id), params: category_params, headers: headers
    assert_response :success
    @category.reload
    assert_equal @category.name, new_name
    assert_equal @category.user_id, @user.id
  end

  def test_user_can_view_all_categories
    get categories_url, headers: headers
    assert_response :success
    assert_equal response.parsed_body.count, 1
  end

  def test_user_cannot_create_category_without_name
    post categories_url,
      params: {
        category:
        {
          name: "", user_id: @user.id
        }
      },
      headers: headers
    assert_response :unprocessable_entity
  end

  def test_user_cannot_create_category_without_user_id
    post categories_url,
      params: {
        category:
        {
          name: "test category"
        }
      },
      headers: headers
    assert_response :unprocessable_entity
  end
end
