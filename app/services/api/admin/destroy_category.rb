# frozen_string_literal: true

# class Api::Admin::Destroy
#   def initialize(category_id:, new_category_id:)
#     @category_id = category_id
#     @new_category_id = new_category_id
#   end

#   def process
#     if category_params[:new_category_id] === nil
#       new_category = Category.create!({ name: "General", user_id: User.first.id })
#       Article.where(category_id: params[:id]).update_all(category_id: new_category.id)
#     elsif category_params[:new_category_id] != "none"
#       Article.where(category_id: params[:id]).update_all(category_id: category_params[:new_category_id])
#     end
#     @category = Category.find_by!(id: params[:id])
#     @category.destroy!
#     respond_with_success(t("successfully_deleted", entity: "Category"))
#   end

# end
