# frozen_string_literal: true

json.schedules @schedules do |schedule|
  json.extract! schedule,
    :id,
    :status
  json.schedule_at schedule.schedule_at.utc.getlocal.strftime("%I:%M %p %d-%m-%Y")
end
