# frozen_string_literal: true

class FutureArticleUpdatesWorker
  include Sidekiq::Worker

  def perform
    schedule_service = SchedulerService.new
    schedule_service.process
  end
end
