# frozen_string_literal: true

class AddColumnStatusInArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :status, :string
  end
end
