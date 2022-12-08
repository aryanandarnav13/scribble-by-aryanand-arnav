# frozen_string_literal: true

require "test_helper"

class Api::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
  end

  def test_user_can_create_valid_category
    post api_categories_url,
      params: {
        payload:
        {
          name: "test category", position: 1, user_id: @user.id
        }
      },
      headers: headers

    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Category")
  end

  def test_user_can_update_any_category_name
    new_name = "updated name"
    category_params = {
      payload:
            {
              name: new_name, position: 1, user_id: @user.id, id: @category.id
            }
    }
    put api_category_path(@category.id), params: category_params, headers: headers

    assert_response :success
    @category.reload
    assert_equal @category.name, new_name
  end

  def test_user_can_update_any_category_position
    new_position = 2
    category_position_params = {
      payload:
        {
          id: @category.id, position: new_position
        }
    }
    patch reorder_api_category_path(@category.id), params: category_position_params, headers: headers, as: :json

    assert_response :success
    @category.reload
    assert_equal @category.position, new_position
  end

  def test_user_can_view_all_categories
    get api_categories_url, headers: headers
    assert_response :success
  end

  def test_user_can_delete_any_category
    delete api_category_path(@category.id), headers: headers
    assert_response :success
    assert_equal response.parsed_body["notice"], t("successfully_deleted", entity: "Category")
  end

  def test_user_should_not_delete_the_last_general_category
    @user.destroy
    @user = create(:user, site: @site)
    @category = create(:category, name: "General", user: @user)
    @articles_in_category = create_list(:article, 10, category: @category, user: @user)

    delete api_category_path(@category.id), headers: headers
    assert_response :unprocessable_entity
    assert_equal response.parsed_body["error"], t("error_deleting", entity: "Category")
  end
end
