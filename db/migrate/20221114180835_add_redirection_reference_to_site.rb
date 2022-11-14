# frozen_string_literal: true

class AddRedirectionReferenceToSite < ActiveRecord::Migration[6.1]
  def change
    remove_column :redirections, :site_id, :integer
    add_column :redirections, :site_id, :uuid
    add_foreign_key :redirections, :sites, on_delete: :cascade
  end
end
