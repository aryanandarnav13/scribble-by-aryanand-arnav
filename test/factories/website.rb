# frozen_string_literal: true

FactoryBot.define do
  factory :website do
    name { Faker::Company.name[0..20] }
    password { Faker::Alphanumeric.unique.alpha(number: 8) }
  end
end
