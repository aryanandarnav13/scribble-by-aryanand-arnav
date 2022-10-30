# frozen_string_literal: true

class AddIndexToUser < ActiveRecord::Migration[6.1]
  def change
    add_index :users, :email, unique: true
    change_column_null :users, :name, false
    change_column_null :users, :email, false
  end
end
