# frozen_string_literal: true

class SchedulerService
  attr_reader :schedules_to_update

  def initialize
    @schedules_to_update = get_schedules
  end

  def process
    update_articles
  end

  private

    def get_schedules
      Schedule.order(schedule_at: :asc)
    end

    def update_articles
      schedules_to_update.each do |schedule|
        UpdateArticlesWorker.perform_in(
          schedule.schedule_at, schedule.article_id, schedule.status, schedule.id)
      end
    end
end
