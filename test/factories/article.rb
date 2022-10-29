# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    association :user_id, factory: :user
    association :category_id, factory: :category
    title { Faker::Lorem.sentence }
    body { Faker::Lorem.paragraph }
    status { "Draft" }
  end
end
