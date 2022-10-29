# frozen_string_literal: true

require "test_helper"

class WebsitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @website = create(:website)
  end

  def test_show
    get website_url(@website)
    assert_response :success
  end

  def test_website_should_have_auth_token
    assert_not_nil @website.authentication_token
  end

  def test_website_should_have_name
    assert_not_nil @website.name
  end

  def test_should_update_website
    @website.save!
    put website_url, params: { name: "Spinkart", password: "welcome1" }, as: :json
    assert_response :success
    assert_equal response.parsed_body["notice"], "This website is successfully updated"
  end

  def test_shouldnt_update_website_without_name
    @website.save!
    put website_url, params: { name: "", password: "welcome1" }, as: :json
    assert_response :unprocessable_entity
  end
end
