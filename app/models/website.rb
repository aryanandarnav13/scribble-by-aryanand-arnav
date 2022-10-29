# frozen_string_literal: true

class Website < ApplicationRecord
  has_many :users
  has_secure_password :password, validations: false
  has_secure_token :authentication_token
  validates :name, presence: true
end
