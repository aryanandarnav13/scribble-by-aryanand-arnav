# frozen_string_literal: true

class DestroyCategory
  attr_reader :category_id, :new_category_id, :current_user
  def initialize(category_id:, new_category_id:, current_user:)
    @_current_user = current_user
    @category_id = category_id
    @new_category_id = new_category_id
  end

  def process
    if @_current_user.categories.count == 1
      if Category.find_by_id(category_id).name == "General"
        return nil
      end

      new_category = Category.create!({ name: "General", user_id: User.first.id })
      Article.where(category_id: category_id).update(category_id: new_category.id)
    else
      if @new_category_id != nil
        Article.where(category_id: category_id).update(category_id: new_category_id)
      end
    end
    category = Category.find_by!(id: category_id)
    category.destroy!
  end
end
