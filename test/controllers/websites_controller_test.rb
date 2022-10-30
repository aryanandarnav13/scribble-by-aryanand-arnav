# frozen_string_literal: true

require "test_helper"

class WebsitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @website = create(:website)
  end

  def test_website_should_have_auth_token
    assert_not_nil @website.authentication_token
  end

  def test_website_should_have_name
    assert_not_nil @website.name
  end

  def test_should_update_valid_website_name
    put website_path(@website.id),
      params: {
        website: {
          name: @website.name, password: @website.password,
          password_enabled: true
        }
      },
      headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_updated", entity: "Website")
  end

  def test_user_can_update_website_fields
    new_name = "#{@website.name}-(updated)"
    new_password = "#{@website.password}-(updated)"
    website_params = { website: { name: new_name, password: new_password, password_enabled: true } }

    put website_path(@website.id), params: website_params, headers: headers
    assert_response :success
    @website.reload
    assert_equal @website.name, new_name
    assert @website.reload.authenticate(new_password)
  end
end
