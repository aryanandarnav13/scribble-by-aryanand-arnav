# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_PAGE_SIZE = 10
  enum status: { drafted: "drafted", published: "published" }

  belongs_to :category
  belongs_to :user
  has_many :article_visits

  validates :title, presence: true, length: { maximum: 255 },
    format: { with: /\A[a-zA-Z0-9\s]+\z/, message: "is invalid" }
  validates :body, presence: true
  validates :status, presence: true
  validate :slug_not_changed

  before_create :set_slug, if: -> { status == "published" }
  before_update :set_slug, if: -> { status == "published" && self.slug == nil }

  acts_as_list scope: :category
  has_paper_trail on: [:update]
  paginates_per MAX_PAGE_SIZE

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

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end
end
