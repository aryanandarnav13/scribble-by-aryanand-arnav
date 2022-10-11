# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles, class_name: "Article", foreign_key: "id"

  validates :name, presence: true
  validates :slug, uniqueness: true

  before_create :set_slug

  private

    def set_slug
      itr = 1
      loop do
        name_slug = name.parameterize
        slug_candidate = itr > 1 ? "#{name_slug}-#{itr}" : name_slug
        break self.slug = slug_candidate unless Category.exists?(slug: slug_candidate)

        itr += 1
      end
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, "is immutable")
      end
    end
end
