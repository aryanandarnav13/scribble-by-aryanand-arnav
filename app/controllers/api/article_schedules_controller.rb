# frozen_string_literal: true

class Api::ArticleSchedulesController < ApplicationController
  before_action :load_article!, only: %i[index create]

  def index
    @schedules = @article.schedules.order(schedule_at: :asc)
  end

  def create
    @article.schedules.create!(status: params[:status], schedule_at: params[:schedule_at])
    respond_with_success(t("successfully_created", entity: "Update Schedule"))
  end

  def destroy
    Schedule.find(params[:id]).destroy!
    respond_with_success(t("successfully_deleted", entity: "Update Schedule"))
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end
end
