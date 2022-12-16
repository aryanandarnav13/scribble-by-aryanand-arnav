# frozen_string_literal: true

class CreateSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules, id: :uuid do |t|
      t.string :status, default: "drafted", null: false
      t.datetime :schedule_at, null: false
      t.timestamps
    end
  end
end
