# frozen_string_literal: true

require "test_helper"

class Api::RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @redirection = create(:redirection, site: @site)
  end

  def test_should_list_all_redirections
    get api_redirections_path, headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["redirections"].length, @site.redirections.count
  end

  def test_redirection_uniqueness
    test_redirection2 = @site.redirections.new frompath: @redirection.frompath, topath: "test"
    assert_not test_redirection2.valid?
  end

  def test_should_create_redirection
    post api_redirections_path, params: { redirection: { frompath: "test1", topath: "test2" } }, headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Redirection")
  end

  def test_should_update_redirection
    new_topath = "updated topath"
    redirection_params = {
      redirection:
            {
              topath: new_topath, frompath: @redirection.frompath
            }
    }
    put api_redirection_path(@redirection.id), params: redirection_params, headers: headers
    assert_response :success
    @redirection.reload
    assert_equal @redirection.topath, new_topath
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_updated", entity: "Redirection")
  end

  def test_should_delete_redirection
    delete api_redirection_path(@redirection.id), headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_deleted", entity: "Redirection")
  end

  def test_should_get_redirection
    get api_redirection_path(@redirection.id), headers: headers, as: :json
    assert_response :success
  end
end
