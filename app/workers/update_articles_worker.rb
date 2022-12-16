# frozen_string_literal: true

class UpdateArticlesWorker
  include Sidekiq::Worker

  def perform(article_id, status, schedule_id)
    if Article.exists?(id: article_id) && Schedule.exists?(id: schedule_id)
      article = Article.find(article_id)
      article.update!(status: status)
      Schedule.find(schedule_id).destroy!
    end
  end
end
