# frozen_string_literal: true

class RemoveCategoryIdColumnInArticle < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :category_id
  end
end
