# frozen_string_literal: true

class AddPasswordEnableToWebsite < ActiveRecord::Migration[6.1]
  def change
    add_column :websites, :password_enabled, :boolean, default: false
  end
end
