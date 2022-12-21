# frozen_string_literal: true

class UpdateArticlesWorker
  include Sidekiq::Worker

  def perform(schedule_id)
    article_id = Schedule.find(schedule_id).article_id
    status = Schedule.find(schedule_id).status
    article = Article.find(article_id)
    article.update!(status: status)
  end
end
