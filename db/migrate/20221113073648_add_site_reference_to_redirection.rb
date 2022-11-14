# frozen_string_literal: true

class AddSiteReferenceToRedirection < ActiveRecord::Migration[6.1]
  def change
    add_column :redirections, :site_id, :integer
    add_foreign_key :redirections, :sites, on_delete: :cascade
  end
end
