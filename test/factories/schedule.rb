# frozen_string_literal: true

FactoryBot.define do
  factory :schedule do
    association :article_id, factory: :article
    status { "published" }
    schedule_at { 1.minutes.from_now(Time.zone.now) }
  end
end
