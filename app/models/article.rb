# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { Draft: "Draft", Publish: "Publish" }
  validates :title, presence: true
  validates :body, presence: true
  validates :status, presence: true
  validate :slug_not_changed
  belongs_to :category
  belongs_to :user
  before_create :set_slug
  before_update :set_slug
  acts_as_list

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
