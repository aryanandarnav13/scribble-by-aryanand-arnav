# frozen_string_literal: true

class Article < ApplicationRecord
  acts_as_list scope: :category
  enum status: { Draft: "Draft", Publish: "Publish" }
  validates :title, presence: true, length: { maximum: 255 },
    format: { with: /\A[a-zA-Z0-9\s]+\z/, message: "is invalid" }
  validates :body, presence: true
  validates :status, presence: true
  validate :slug_not_changed
  belongs_to :category
  belongs_to :user
  before_create :set_slug
  before_update :set_slug

  private

    def set_slug
      if self.status == "Publish" && self.slug == nil
        itr = 1
        loop do
          title_slug = title.parameterize
          slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
          break self.slug = slug_candidate unless Article.exists?(slug: slug_candidate)

          itr += 1
        end
      end
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end
end
