# frozen_string_literal: true

class AddUserReferenceToSite < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :site_id, :integer
    add_column :users, :site_id, :uuid
    add_foreign_key :users, :sites, on_delete: :cascade
  end
end
