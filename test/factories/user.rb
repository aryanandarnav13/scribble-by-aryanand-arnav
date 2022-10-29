# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    association :website_id, factory: :website
    name { Faker::Name.name }
    email { Faker::Internet.email }
  end
end
