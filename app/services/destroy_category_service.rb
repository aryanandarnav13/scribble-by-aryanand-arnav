# frozen_string_literal: true

class DestroyCategoryService
  attr_reader :category_id, :new_category_id, :current_user
  def initialize(category_id:, new_category_id:, current_user:)
    @current_user = current_user
    @category_id = category_id
    @new_category_id = new_category_id
  end

  def process
    if current_user.categories.count == 1
      if current_user.categories.find_by_id(category_id).name == "General"
        return nil
      end

      new_category = current_user.categories.create!({ name: "General", user_id: User.first.id })
      all_articles = current_user.articles.where(category_id: category_id)
      all_articles.each do |article_id|
        article = current_user.articles.find_by_id(article_id).remove_from_list
      end
      current_user.articles.where(category_id: category_id).update(category_id: new_category.id)
    else
      if @new_category_id != nil
        all_articles = current_user.articles.where(category_id: category_id)
        all_articles.each do |article_id|
          current_user.articles.find_by_id(article_id).remove_from_list
        end
        current_user.articles.where(category_id: category_id).update(category_id: new_category_id)
      end
    end
    category = current_user.categories.find_by!(id: category_id)
    category.destroy!
  end
end
