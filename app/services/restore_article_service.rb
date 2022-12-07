# frozen_string_literal: true

class RestoreArticleService
  attr_reader :article, :version_at, :restored_at, :current_user
  def initialize(article, version_at, restored_at, current_user)
    @article = article
    @version_at = version_at
    @restored_at = restored_at
    @current_user = current_user
  end

  def process
    original_slug = @article.slug
    @article = article.paper_trail.version_at(version_at)
    old_category = find_old_category

    handle_deleted_old_category if old_category == nil

    @article.restored_at = restored_at
    @article.slug = original_slug
    @article.save!
  end

  private

    def find_old_category
      current_user.categories.find_by(id: @article.category_id)
    end

    def handle_deleted_old_category
      if current_user.categories.find_by(name: "General") == nil
        new_category = current_user.categories.create!({ name: "General" })
      else
        new_category = current_user.categories.find_by(name: "General")
      end
      @article.category_id = new_category.id
    end
end
