# frozen_string_literal: true

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  def test_should_get_successfully_from_root_url
    get root_path
    assert_response :success
  end

  def test_redirection_should_work
    @site = create(:site)
    redirection = create(:redirection, site: @site)
    get redirection.from
    assert_redirected_to redirection.to
  end
end
