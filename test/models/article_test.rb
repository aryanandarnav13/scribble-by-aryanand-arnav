# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_article_should_not_be_valid_without_title
    @article.title = ""
    assert_not @article.valid?
  end

  def test_article_should_not_be_valid_without_body
    @article.body = ""
    assert_not @article.valid?
  end

  def test_article_should_not_be_valid_without_category
    @article.category = nil
    assert_not @article.valid?
  end

  def test_article_should_not_be_valid_without_user
    @article.user = nil
    assert_not @article.valid?
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_two_worded_titles
    first_article = @user.articles.create!(
      title: "test article", body: "This is a test article body",
      user_id: @user.id, category: @category, status: "published", position: 1)
    second_article = @user.articles.create!(
      title: "test article", body: "This is a test article body",
      user_id: @user.id, category: @category, status: "published", position: 1)

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_updating_title_does_not_update_slug
    assert_no_changes -> { @article.reload.slug } do
      updated_article_title = "updated article title"
      @article.update!(title: updated_article_title)

      assert_equal updated_article_title, @article.title
    end
  end

  def test_updating_category_does_not_update_slug
    assert_no_changes -> { @article.reload.slug } do
      updated_category = create(:category, user: @user)
      @article.update!(category: updated_category)

      assert_equal updated_category, @article.category
    end
   end

  def test_article_should_be_deleted_when_category_is_deleted
    @category.destroy
    assert_empty @category.articles
  end

  def test_article_should_be_deleted_when_user_is_deleted
    @user.destroy
    assert_empty @user.articles
  end

  def test_user_cannot_create_article_with_non_alphanumeric_title
    assert_raises ActiveRecord::RecordInvalid do
      @user.articles.create!(
        title: "test article!", body: "This is a test article body",
        user_id: @user.id, category: @category, status: "published", position: 1)
    end
  end

  def test_should_not_mutate_slug
    test_article = @user.articles.create!(
      category_id: @category.id, title: "test article",
      body: "This is a test article body", status: "published")
    test_article.slug = "test-article-1"

    assert_raises ActiveRecord::RecordInvalid do
      test_article.save!
    end
    assert_match t("article.slug.immutable"), test_article.errors_to_sentence
  end
end
