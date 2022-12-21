# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :article

  validates :schedule_at, presence: true
  validates :status, presence: true
  validates_with ScheduleValidator
end
