# frozen_string_literal: true

require "test_helper"

class ScheduleTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article, schedule_at: Time.current + 1.minute)
  end

  def test_schedule_in_future
    @schedule.schedule_at = Time.current + 1.hour
    assert @schedule.valid?
  end

  def test_schedule_not_in_past
    @schedule.schedule_at = Time.current - 1.hour
    assert_not @schedule.valid?
  end

  def test_new_schedule_should_be_after_old_schedule
    @schedule.schedule_at = Time.current + 2.hours
    @schedule.save
    assert @schedule.valid?
    schedule1 = @article.schedules.create(schedule_at: Time.current + 1.hour, status: "published")
    assert_equal schedule1.errors.full_messages, [t("schedule.should_be_after_old_schedule")]
  end

  def test_drafted_article_shouldnt_be_unpublished
    @article.schedules.destroy_all
    @article.status = "drafted"
    @article.save
    schedule1 = @article.schedules.create(schedule_at: Time.current + 1.hour, status: "drafted")
    assert_equal schedule1.errors.full_messages, [t("schedule.drafted_unpublished")]
  end

  def test_published_article_shouldnt_be_published
    @article.schedules.destroy_all
    @article.status = "published"
    @article.save
    schedule1 = @article.schedules.create(schedule_at: Time.current + 1.hour, status: "published")
    assert_equal schedule1.errors.full_messages, [t("schedule.published_published")]
  end
end
