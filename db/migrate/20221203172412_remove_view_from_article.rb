# frozen_string_literal: true

class RemoveViewFromArticle < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :views
  end
end
