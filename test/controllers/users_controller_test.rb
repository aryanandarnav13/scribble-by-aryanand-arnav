# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @website = create(:website)
    @user = create(:user, website: @website)
  end

  def test_should_list_all_users
    get users_path, headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["users"].length, User.count
  end
end
