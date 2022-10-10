# frozen_string_literal: true

class RemoveColumnStatusInArticle < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :status
  end
end
