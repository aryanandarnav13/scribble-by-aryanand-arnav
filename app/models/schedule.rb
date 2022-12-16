# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :article

  validates :schedule_at, presence: true
  validates :status, presence: true
  validate :schedule_at_not_in_past
  validate :new_schedule_should_be_after_old_schedule
  validate :check_drafted_article_shouldnt_be_unpublished
  validate :check_published_article_shoulnt_be_published

  private

    def schedule_at_not_in_past
      if schedule_at.present? && schedule_at < Time.zone.now
        errors.add(:base, t("schedule.not_in_past"))
      end
    end

    def new_schedule_should_be_after_old_schedule
      previous_schedule = Schedule.where(article_id: article_id).first
      if schedule_at.present? && previous_schedule.present? && schedule_at < previous_schedule.schedule_at
        errors.add(:base, t("schedule.should_be_after_old_schedule"))
      end
    end

    def check_drafted_article_shouldnt_be_unpublished
      published_schedule = Schedule.where(article_id: article_id, status: "published")
      if article.status == "drafted" && published_schedule.blank? && status == "drafted"
        errors.add(:base, t("schedule.drafted_unpublished"))
      end
    end

    def check_published_article_shoulnt_be_published
      drafted_schedule = Schedule.where(article_id: article_id, status: "drafted")
      if article.status == "published" && drafted_schedule.blank? && status == "published"
        errors.add(:base, t("schedule.published_published"))
      end
    end
end
