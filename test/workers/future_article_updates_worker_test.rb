# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class FutureArticleUpdatesWorkerTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user, status: "drafted")
  end

  def test_should_update_the_article_status
    @article.schedules.create!(schedule_at: Time.current + 1.minute, status: "published")
    FutureArticleUpdatesWorker.perform_async
    @article.reload
    assert_equal @article.status, "published"
  end
end
