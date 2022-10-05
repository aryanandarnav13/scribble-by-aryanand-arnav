# frozen_string_literal: true

class AddColumnInArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :author, :string, default: "Oliver Smith"
    add_column :articles, :category_id, :integer
    add_column :articles, :status, :string, default: "Draft"
  end
end
