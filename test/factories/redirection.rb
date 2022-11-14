# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    association :site_id, factory: :site
    topath { "/#{ Faker::Lorem.characters[0..15] }" }
    frompath { "/#{ Faker::Lorem.characters[0..15] }" }
  end
end
