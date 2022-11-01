# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { Draft: "Draft", Publish: "Publish" }
  validates :title, presence: true
  validates :body, presence: true
  validates :status, presence: true
  validates :slug, uniqueness: true
  belongs_to :category
  belongs_to :user
  before_create :set_slug

  private

    def set_slug
      itr = 1
      loop do
        title_slug = title.parameterize
        slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
        break self.slug = slug_candidate unless Article.exists?(slug: slug_candidate)

        itr += 1
      end
    end
end
