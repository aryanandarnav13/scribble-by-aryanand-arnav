# frozen_string_literal: true

class RemoveAuthorFromArticle < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :author
  end
end
