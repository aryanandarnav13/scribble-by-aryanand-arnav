# frozen_string_literal: true

class ChangeIdToUuidForCategory < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :uuid, :uuid, default: "gen_random_uuid()", null: false
    rename_column :categories, :id, :integer_id
    rename_column :categories, :uuid, :id
    execute "ALTER TABLE categories drop constraint categories_pkey;"
    execute "ALTER TABLE categories ADD PRIMARY KEY (id);"
    remove_column :categories, :integer_id, :bigint
  end
end
