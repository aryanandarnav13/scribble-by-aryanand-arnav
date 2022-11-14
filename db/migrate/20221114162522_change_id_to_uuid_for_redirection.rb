# frozen_string_literal: true

class ChangeIdToUuidForRedirection < ActiveRecord::Migration[6.1]
  def change
    add_column :redirections, :uuid, :uuid, default: "gen_random_uuid()", null: false
    rename_column :redirections, :id, :integer_id
    rename_column :redirections, :uuid, :id
    execute "ALTER TABLE redirections drop constraint redirections_pkey;"
    execute "ALTER TABLE redirections ADD PRIMARY KEY (id);"
    remove_column :redirections, :integer_id, :bigint
  end
end
