# frozen_string_literal: true

class RemoveRedirectionReferenceToSite < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :redirections, :sites
  end
end
