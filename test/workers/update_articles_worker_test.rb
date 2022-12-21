# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class UpdateArticlesWorkerTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user, status: "drafted")
    @schedule = create(:schedule, article: @article, status: "published")
  end

  def test_should_update_the_article_status
    UpdateArticlesWorker.perform_in(Time.current + 1.minute, @schedule.id)
    @article.reload
    assert_equal @article.status, "published"
  end

  def test_should_check_if_schedule_cleared
    assert_difference -> { Schedule.count }, -1 do
      UpdateArticlesWorker.perform_in(Time.current, @schedule.id)
    end
  end
end
