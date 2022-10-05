# frozen_string_literal: true

class RemoveColumnInCategory < ActiveRecord::Migration[6.1]
  def change
    remove_column :categories, :slug
  end
end
