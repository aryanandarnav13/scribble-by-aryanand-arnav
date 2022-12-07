# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    association :site_id, factory: :site
    to { "/#{ Faker::Alphanumeric.alphanumeric(number: 10) }" }
    from { "/#{ Faker::Alphanumeric.alphanumeric(number: 10) }" }
  end
end
