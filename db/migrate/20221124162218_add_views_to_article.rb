# frozen_string_literal: true

class AddViewsToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :views, :integer, default: 0, null: false
  end
end
