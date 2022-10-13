# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles, class_name: "Article", foreign_key: "id"
  validates :name, presence: true
end
