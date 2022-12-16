# frozen_string_literal: true

class AddScheduleToArticle < ActiveRecord::Migration[6.1]
  def change
    add_reference :schedules, :article, foreign_key: true, type: :uuid
  end
end
