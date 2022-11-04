# frozen_string_literal: true

class ChangeWebsitesToSites < ActiveRecord::Migration[6.1]
  def change
    rename_table :websites, :sites
  end
end
