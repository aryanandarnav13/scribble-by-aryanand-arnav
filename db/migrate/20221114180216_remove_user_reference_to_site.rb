# frozen_string_literal: true

class RemoveUserReferenceToSite < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :users, :sites
  end
end
