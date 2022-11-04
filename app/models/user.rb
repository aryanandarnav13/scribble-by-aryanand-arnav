# frozen_string_literal: true

class User < ApplicationRecord
  has_many :articles
  has_many :categories
  VALID_EMAIL = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  validates :name, presence: true
  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: VALID_EMAIL }
  before_save :to_lowercase
  belongs_to :site

  private

    def to_lowercase
      email.downcase!
    end
end
