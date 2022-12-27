# frozen_string_literal: true

class ReportsWorker
  include Sidekiq::Worker
  include ActionView::Helpers::TranslationHelper

  def perform(user_id, report_path)
    articles = Article.accessible_to(user_id)

    content = ApplicationController.render(
      assigns: {
        articles: articles
      },
      template: "api/articles/report/download",
      layout: "pdf"
    )
    pdf_blob = WickedPdf.new.pdf_from_string content
    File.open(report_path, "wb") do |f|
      f.write(pdf_blob)
    end
  end
end
