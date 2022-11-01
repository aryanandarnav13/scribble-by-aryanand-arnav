# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @website = create(:website)
    @user = create(:user, website: @website)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_user_should_create_valid_article
    post articles_url,
      params: {
        article:
        {
          title: "test article", body: "This is a test article body",
          user_id: @user.id, category_id: @category.id, status: "Publish"
        }
      },
      headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Article")
  end

  def test_user_shouldnt_create_article_without_title
    post articles_url,
      params: {
        article:
        {
          body: "This is a test article body",
          user_id: @user.id, category_id: @category.id, status: "Publish"
        }
      },
      headers: headers
    assert_response :unprocessable_entity
  end

  def test_user_can_update_any_article
    new_title = "updated title"
    article_params = {
      article:
            {
              title: new_title, category_id: @category.id, status: "Publish", user_id: @user.id,
              body: "This is a test article body"
            }
    }
    put article_path(@article.slug), params: article_params, headers: headers
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
    delete article_path(@article.slug), headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_deleted", entity: "Article")
  end

  def test_user_can_get_all_articles
    get articles_path, headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].count, 1
  end
end
