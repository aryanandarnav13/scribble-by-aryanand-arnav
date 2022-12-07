# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :site
  validates :from, uniqueness: true,
    format: { with: /^(?!\/\/)^(?!(^[a-zA-Z0-9\s]))/, multiline: true }
  validates :to, format: { with: /^(?!\/\/)^(?!(^[a-zA-Z0-9\s]))/, multiline: true }
  validates_with RedirectionValidator
end
