# frozen_string_literal: true

require "test_helper"

class Api::Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_user_should_get_only_published_articles
    get api_articles_path,
      params: {
        statusFilter: "Publish",
        searchFilter: ""
      }, headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].count, 0
  end
end
