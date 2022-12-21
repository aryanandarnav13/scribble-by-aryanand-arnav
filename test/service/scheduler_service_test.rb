# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class SchedulerServiceTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user, status: "drafted")
  end

  def test_should_update_article_later
    @article.schedules.create!(schedule_at: Time.current + 1.minute, status: "published")
    SchedulerService.new().process
    assert_equal @article.reload.status, "published"
  end
end
