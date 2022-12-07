# frozen_string_literal: true

class Site < ApplicationRecord
  attr_accessor :is_token_updated
  has_many :users
  has_many :redirections
  validates :name, presence: true
  has_secure_password :password, validations: false
  has_secure_token :authentication_token
  before_update :update_token, if: -> { password_digest_changed? }

  private

    def update_token
      unless is_token_updated
        self.is_token_updated = true
        self.regenerate_authentication_token
      end
    end
end
