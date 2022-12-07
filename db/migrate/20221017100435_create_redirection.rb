# frozen_string_literal: true

class CreateRedirection < ActiveRecord::Migration[6.1]
  def change
    create_table :redirections do |t|
      t.string :from
      t.string :to
      t.timestamps
    end
  end
end
