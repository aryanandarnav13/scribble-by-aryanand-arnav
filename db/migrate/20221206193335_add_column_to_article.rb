# frozen_string_literal: true

class AddColumnToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :restored_at, :datetime
  end
end
