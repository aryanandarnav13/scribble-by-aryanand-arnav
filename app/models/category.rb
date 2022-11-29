# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles
  validates :name, presence: true, uniqueness: true
  belongs_to :user
  acts_as_list
end
