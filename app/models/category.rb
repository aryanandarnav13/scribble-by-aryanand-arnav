# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles, class_name: "Article", foreign_key: "id"
  validates :name, presence: true

  before_create :assign_position

  def assign_position
    max_position = Category.maximum(:position)
    self.position = (max_position.nil?) ? 0 : max_position + 1
  end
end
