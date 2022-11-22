# frozen_string_literal: true

require "test_helper"

class Api::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
  end

  def test_shouldnt_login_user_with_invalid_credentials
    post api_session_path, params: { login: { password: "invalid password" } }, as: :json
    assert_response :unauthorized
    assert_equal response.parsed_body["error"], "Incorrect credentials"
  end

  def test_should_login_user_with_valid_credentials
    post api_session_path, params: { password: @site.password }, as: :json
    assert_response :success
    assert_equal response.parsed_body["authentication_token"], @site.authentication_token
  end
end
