# frozen_string_literal: true

class RemoveWebsiteReferenceToUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :website_id, :integer
  end
end
