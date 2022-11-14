# frozen_string_literal: true

class ChangeIdToUuidForUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :uuid, :uuid, default: "gen_random_uuid()", null: false
    rename_column :users, :id, :integer_id
    rename_column :users, :uuid, :id
    execute "ALTER TABLE users drop constraint users_pkey;"
    execute "ALTER TABLE users ADD PRIMARY KEY (id);"
    remove_column :users, :integer_id, :bigint
  end
end
