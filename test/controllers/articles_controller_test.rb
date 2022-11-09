# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_user_should_create_valid_article
    post api_articles_path,
      params: {
        article:
        {
          title: "test article", body: "This is a test article body",
          user_id: @user.id, category_id: @category.id, status: "Publish", position: 1
        }
      }, as: :json, headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Article")
  end

  def test_user_can_update_any_article
    new_title = "updated title"
    article_params = {
      article:
            {
              title: new_title, category_id: @category.id, status: "Publish", user_id: @user.id, position: 1,
              body: "This is a test article body"
            }
    }
    put api_article_path(@article.slug), params: article_params, headers: headers, as: :json
    assert_response :success
    @article.reload
    assert_equal @article.title, new_title
    assert_equal @article.category_id, @category.id
    assert_equal @article.user_id, @user.id
    assert_equal @article.status, "Publish"
    assert_equal @article.body, "This is a test article body"
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_updated", entity: "Article")
  end

  def test_user_can_destroy_article
    delete api_article_path(@article.slug), headers: headers, as: :json
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_deleted", entity: "Article")
  end

  def test_user_can_get_all_articles
    get api_articles_path,
      params: {
        statusFilter: "All",
        searchFilter: ""
      }, headers: headers, as: :json
    assert_response :success
  end

  def test_user_can_get_all_published_articles
    get api_articles_path,
      params: {
        statusFilter: "Publish",
        searchFilter: ""
      }, headers: headers, as: :json
    assert_response :success
  end

  def test_user_can_get_all_drafted_articles
    get api_articles_path,
      params: {
        statusFilter: "Draft",
        searchFilter: ""
      }, headers: headers, as: :json
    assert_response :success
  end

  def test_user_can_get_particlular_category__articles
    get api_articles_path,
      params: {
        statusFilter: "All",
        searchFilter: "",
        categoriesFilter: @category.id
      }, headers: headers, as: :json
    assert_response :success
  end

  def test_user_can_get_searched__articles
    get api_articles_path,
      params: {
        statusFilter: "All",
        searchFilter: @article.title
      }, headers: headers, as: :json
    assert_response :success
  end
end
