# frozen_string_literal: true

FactoryBot.define do
  factory :site do
    name { Faker::Company.name[0..20] }
    password { Faker::Alphanumeric.unique.alpha(number: 8) }
    password_enabled { false }
  end
end
