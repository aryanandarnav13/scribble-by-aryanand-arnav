# frozen_string_literal: true

require "test_helper"

class Api::Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_user_should_get_all_articles
    get api_public_articles_path, headers: headers
    assert_response :success
  end

  def test_user_should_get_article
    get api_public_article_path(@article.slug), headers: headers
    assert_response :success
  end

  def test_should_not_list_articles_if_password_enabled
    @site.update(password_enabled: true)
    get api_public_articles_path, headers: headers
    assert_response :unauthorized
  end
end
