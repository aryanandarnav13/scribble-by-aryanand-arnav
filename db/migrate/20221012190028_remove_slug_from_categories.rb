# frozen_string_literal: true

class RemoveSlugFromCategories < ActiveRecord::Migration[6.1]
  def change
    remove_column :categories, :slug
  end
end
