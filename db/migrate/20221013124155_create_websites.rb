# frozen_string_literal: true

class CreateWebsites < ActiveRecord::Migration[6.1]
  def change
    create_table :websites do |t|
      t.text :name, null: false
      t.string :password_digest
      t.string :authentication_token
      t.timestamps
    end
  end
end
