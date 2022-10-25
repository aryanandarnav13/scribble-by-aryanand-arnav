# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    title { Faker::Lorem.sentence }
    body { Faker::Lorem.paragraph }
    status { "Draft" }
    association :category, factory: :category
  end
end
