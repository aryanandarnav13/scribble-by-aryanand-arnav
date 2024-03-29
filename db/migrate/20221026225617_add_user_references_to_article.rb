# frozen_string_literal: true

class AddUserReferencesToArticle < ActiveRecord::Migration[6.1]
  def change
    Article.reset_column_information
    add_column :articles, :user_id, :integer
    add_foreign_key :articles, :users, on_delete: :cascade
  end
end
