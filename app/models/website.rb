# frozen_string_literal: true

class Website < ApplicationRecord
  has_secure_password :password, validations: false
  has_secure_token :authentication_token
  validates :name, presence: true
  validates :password, length: { minimum: 6 },
    format: { with: /(?=.?[0-9])(?=.?[A-Za-z]).+/, message: "Require 1 letter and number" },
    if: :password_digest?
end
