# frozen_string_literal: true

class DestroyCategoryService
  attr_reader :category_id, :new_category_id, :current_user
  def initialize(category_id:, new_category_id:, current_user:)
    @_current_user = current_user
    @category_id = category_id
    @new_category_id = new_category_id
  end

  def process
    if @_current_user.categories.count == 1
      if @_current_user.categories.find_by_id(category_id).name == "General"
        return nil
      end

      new_category = @_current_user.categories.create!({ name: "General", user_id: User.first.id })
      @_current_user.articles.where(category_id: category_id).update(category_id: new_category.id)
    else
      if @new_category_id != nil
        @_current_user.articles.where(category_id: category_id).update(category_id: new_category_id)
      end
    end
    category = @_current_user.categories.find_by!(id: category_id)
    category.destroy!
  end
end
