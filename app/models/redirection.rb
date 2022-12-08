# frozen_string_literal: true

class Redirection < ApplicationRecord
  PATH_REGEX = /^(?!\/\/)^(?!(^[a-zA-Z0-9\s]))/

  belongs_to :site

  validates :from, uniqueness: true,
    format: { with: PATH_REGEX, multiline: true }
  validates :to, format: { with: PATH_REGEX, multiline: true }
  validates_with RedirectionValidator
end
