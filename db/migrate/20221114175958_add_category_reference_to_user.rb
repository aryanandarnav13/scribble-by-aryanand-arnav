# frozen_string_literal: true

class AddCategoryReferenceToUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :categories, :user_id, :integer
    add_column :categories, :user_id, :uuid
    add_foreign_key :categories, :users, on_delete: :cascade
  end
end
