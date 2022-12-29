# frozen_string_literal: true

class ReportsWorker
  include Sidekiq::Worker
  include ActionView::Helpers::TranslationHelper

  def perform(user_id)
    user_email = User.find(user_id).email
    ActionCable.server.broadcast(user_email, { message: t("report.render"), progress: 25 })
    articles = Article.accessible_to(user_id)
    html_report = ApplicationController.render(
      assigns: {
        articles: articles
      },
      template: "api/articles/report/download",
      layout: "pdf"
    )
    pdf_report = WickedPdf.new.pdf_from_string html_report
    ActionCable.server.broadcast(user_email, { message: t("report.generate"), progress: 50 })
    current_user = User.find_by!(id: user_id)
    if current_user.report.attached?
      current_user.report.purge_later
    end
    ActionCable.server.broadcast(user_email, { message: t("report.upload"), progress: 75 })
    current_user.report.attach(
      io: StringIO.new(pdf_report), filename: "scribble_article_report.pdf",
      content_type: "application/pdf")
    current_user.save
    ActionCable.server.broadcast(user_email, { message: t("report.attach"), progress: 100 })
  end
end
