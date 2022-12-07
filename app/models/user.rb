# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

  belongs_to :site
  has_many :articles
  has_many :categories

  validates :name, presence: true
  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: VALID_EMAIL }

  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
