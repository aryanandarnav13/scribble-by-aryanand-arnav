# frozen_string_literal: true

class CreateViews < ActiveRecord::Migration[6.1]
  def change
    create_table :views, id: :uuid do |t|
      t.uuid :article_id, null: false
      t.timestamps
    end
  end
end
