# frozen_string_literal: true

class AddUniqueIndexForSlugInCategory < ActiveRecord::Migration[6.1]
  def change
    add_index :categories, :slug, unique: true
  end
end
