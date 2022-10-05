# frozen_string_literal: true

class AddReferencesToArticles < ActiveRecord::Migration[6.1]
  def change
    add_reference :articles, :category, null: true, foreign_key: true
  end
end
