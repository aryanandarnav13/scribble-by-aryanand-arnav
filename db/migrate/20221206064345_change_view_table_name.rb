# frozen_string_literal: true

class ChangeViewTableName < ActiveRecord::Migration[6.1]
  def change
    rename_table :views, :article_visits
  end
end
