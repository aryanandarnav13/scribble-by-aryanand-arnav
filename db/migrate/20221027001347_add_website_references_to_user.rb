# frozen_string_literal: true

class AddWebsiteReferencesToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :website_id, :integer
    add_foreign_key :users, :websites, on_delete: :cascade
  end
end
