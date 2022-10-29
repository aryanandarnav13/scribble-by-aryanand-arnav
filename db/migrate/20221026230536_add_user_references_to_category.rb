# frozen_string_literal: true

class AddUserReferencesToCategory < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :user_id, :integer
    add_foreign_key :categories, :users, on_delete: :cascade
  end
end
