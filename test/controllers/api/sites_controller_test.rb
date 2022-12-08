# frozen_string_literal: true

require "test_helper"

class Api::SitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
  end

  def test_site_should_have_auth_token
    assert_not_nil @site.authentication_token
  end

  def test_site_should_have_name
    assert_not_nil @site.name
  end

  def test_should_update_valid_site_name
    put api_site_path,
      params: {
        site: {
          name: @site.name, password: @site.password,
          password_enabled: true
        }
      },
      headers: headers

    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_updated", entity: "Site")
  end

  def test_user_can_update_site_fields
    new_name = "#{@site.name}-(updated)"
    new_password = "#{@site.password}-(updated)"
    site_params = { site: { name: new_name, password: new_password, password_enabled: true } }
    put api_site_path, params: site_params, headers: headers

    assert_response :success
    @site.reload
    assert_equal @site.name, new_name
    assert @site.reload.authenticate(new_password)
  end

  def test_user_can_get_site_details
    get api_site_path, headers: headers
    assert_response :success
  end
end
