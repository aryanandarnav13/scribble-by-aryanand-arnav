# frozen_string_literal: true

class RestoreArticleService
  attr_reader :article, :version_at, :current_user
  def initialize(article, version_at, current_user)
    @article = article
    @version_at = version_at
    @current_user = current_user
  end

  def process
    @article = article.paper_trail.version_at(version_at)
    old_category = Category.find_by(id: @article.category_id)
    if old_category == nil
      if Category.find_by(name: "General") == nil
        new_category = Category.create!({ name: "General", user_id: User.first.id })
      else
        new_category = Category.find_by(name: "General")
      end
      @article.category_id = new_category.id
    end
    @article.save!

    created_version = article.versions.last
    created_version.object["restored"] = true
    created_version.save!
  end
end
