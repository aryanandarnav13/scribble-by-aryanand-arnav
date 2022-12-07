# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    association :user_id, factory: :user
    association :category_id, factory: :category
    title { Faker::Alphanumeric.alphanumeric(number: 10) }
    body { Faker::Lorem.paragraph }
    status { "drafted" }
    position { Faker::Number.number(digits: 3) }
  end
end
