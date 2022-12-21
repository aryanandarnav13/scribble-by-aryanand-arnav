 # frozen_string_literal: true

 class ScheduleValidator < ActiveModel::Validator
   include ActionView::Helpers::TranslationHelper

   def validate(record)
     schedule_at_not_in_past(record)
     new_schedule_should_be_after_old_schedule(record)
     check_drafted_article_shouldnt_be_unpublished(record)
     check_published_article_shoulnt_be_published(record)
   end

   private

     def schedule_at_not_in_past(record)
       if record.schedule_at.past?
         record.errors.add(:base, t("schedule.not_in_past"))
       end
     end

     def new_schedule_should_be_after_old_schedule(record)
       previous_schedule = Schedule.where(article_id: record.article_id).first
       if previous_schedule.present? && record.schedule_at < previous_schedule.schedule_at
         record.errors.add(:base, t("schedule.should_be_after_old_schedule"))
       end
     end

     def check_drafted_article_shouldnt_be_unpublished(record)
       published_schedule = Schedule.where(article_id: record.article_id, status: "published")
       if record.article.status == "drafted" && published_schedule.blank? && record.status == "drafted"
         record.errors.add(:base, t("schedule.drafted_unpublished"))
       end
     end

     def check_published_article_shoulnt_be_published(record)
       drafted_schedule = Schedule.where(article_id: record.article_id, status: "drafted")
       if record.article.status == "published" && drafted_schedule.blank? && record.status == "published"
         record.errors.add(:base, t("schedule.published_published"))
       end
     end
 end
