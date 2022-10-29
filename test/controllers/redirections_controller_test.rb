# frozen_string_literal: true

require "test_helper"

class RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @redirection = create(:redirection)
  end

  def test_should_list_all_redirections
    get redirections_path, headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["redirections"].length, Redirection.count
  end

  def test_redirection_uniqueness
    test_redirection2 = Redirection.new frompath: @redirection.frompath, topath: "test"
    assert_not test_redirection2.valid?
  end

  def test_should_create_redirection
    post redirections_path, params: { redirection: { frompath: "test1", topath: "test2" } }, headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], "The redirection is successfully created"
  end

  def test_should_update_redirection
    new_topath = "updated topath"
    redirection_params = {
      redirection:
            {
              topath: new_topath, frompath: @redirection.frompath
            }
    }
    put redirection_path(@redirection.id), params: redirection_params, headers: headers
    assert_response :success
    @redirection.reload
    assert_equal @redirection.topath, new_topath
  end

  def test_should_delete_redirection
    delete redirection_path(@redirection.id), headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], "This redirection is successfully deleted"
  end
end
