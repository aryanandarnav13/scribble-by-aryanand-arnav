# frozen_string_literal: true

class AddArticleReferenceToUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :user_id, :integer
    add_column :articles, :user_id, :uuid
    add_foreign_key :articles, :users, on_delete: :cascade
  end
end
