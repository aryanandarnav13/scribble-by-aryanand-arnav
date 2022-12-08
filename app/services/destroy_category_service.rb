# frozen_string_literal: true

class DestroyCategoryService
  attr_reader :category_id, :new_category_id, :current_user
  def initialize(category_id:, new_category_id:, current_user:)
    @current_user = current_user
    @category_id = category_id
    @new_category_id = new_category_id
  end

  def process!
    if current_user.categories.count == 1
      return nil if find_general_category

      new_category = create_general_category
      handle_remove_from_list
      update_articles_category(new_category.id)
    elsif @new_category_id != nil
      handle_remove_from_list
      update_articles_category(new_category_id)
    end
    handle_delete_category
  end

  private

    def handle_remove_from_list
      all_articles = current_user.articles.where(category_id: category_id)
      all_articles.each do |article_id|
        current_user.articles.find_by_id(article_id).remove_from_list
      end
    end

    def update_articles_category(id)
      current_user.articles.where(category_id: category_id).update(category_id: id)
    end

    def create_general_category
      current_user.categories.create!({ name: "General" })
    end

    def find_general_category
      current_user.categories.find_by_id(category_id).name == "General"
    end

    def handle_delete_category
      category = current_user.categories.find(category_id)
      category.destroy!
    end
end
