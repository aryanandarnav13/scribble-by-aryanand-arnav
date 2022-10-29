# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    association :user_id, factory: :user
    name { Faker::Name.name }
    position { Faker::Number.number(digits: 3) }
  end
end
