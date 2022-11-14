# frozen_string_literal: true

class AddArticleReferenceToCategory < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :category_id, :integer
    add_column :articles, :category_id, :uuid
    add_foreign_key :articles, :categories, on_delete: :cascade
  end
end
