# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    name { Faker::Name.name }
    position { Faker::Number.number(digits: 3) }
  end
end

frozen_string_literal: true
