# frozen_string_literal: true

class AddSlugToCategory < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :slug, :string
  end
end
