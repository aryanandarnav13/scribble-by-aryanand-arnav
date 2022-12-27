# frozen_string_literal: true

class Article < ApplicationRecord
  scope :accessible_to, ->(user_id) { where("user_id = ? AND status = ?", user_id, "published") }

  MAX_PAGE_SIZE = 10
  TITLE_REGEX = /\A[a-zA-Z0-9\s]+\z/

  enum status: { drafted: "drafted", published: "published" }

  belongs_to :category
  belongs_to :user
  has_many :article_visits
  has_many :schedules, dependent: :destroy

  validates :title, presence: true, length: { maximum: 255 },
    format: { with: TITLE_REGEX, message: "is invalid" }
  validates :body, presence: true
  validates :status, presence: true
  validate :slug_not_changed

  before_create :set_slug, if: -> { status == "published" }
  before_update :set_slug, if: -> { status == "published" && self.slug == nil }
  before_update :delete_schedules, if: -> { status_changed? && schedules.present? }

  has_paper_trail on: [:update], only: [:title, :body, :status, :category_id]
  acts_as_list scope: :category
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

    def delete_schedules
      schedules.find_by(status: "drafted").destroy if status == "drafted"
      schedules.find_by(status: "published").destroy if status == "published"
    end
end
