# frozen_string_literal: true

class RemoveColumnInArticle < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :category
  end
end
