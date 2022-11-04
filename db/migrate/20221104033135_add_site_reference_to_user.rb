# frozen_string_literal: true

class AddSiteReferenceToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :site_id, :integer
    add_foreign_key :users, :sites, on_delete: :cascade
  end
end
