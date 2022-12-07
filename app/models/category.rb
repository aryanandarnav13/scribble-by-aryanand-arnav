# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :user
  has_many :articles
  validates :name, presence: true, uniqueness: true
  acts_as_list
end
