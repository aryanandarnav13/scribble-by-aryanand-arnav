# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    association :site_id, factory: :site
    name { Faker::Name.name }
    email { Faker::Internet.email }
  end
end
