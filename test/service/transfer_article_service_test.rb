# frozen_string_literal: true

require "test_helper"

class TransferArticleServiceTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_move_article_to_new_category
    @category1 = create(:category, user: @user)
    @article1 = create(:article, category: @category, user: @user)
    articleArray = [@article1.id, @article.id]
    @service = TransferArticleService.new(
      article_ids: articleArray, new_category_id: @category1.id, current_user: @user)
    @service.process
    assert_equal @article.reload.category_id, @category1.id
    assert_equal @article1.reload.category_id, @category1.id
  end
end
