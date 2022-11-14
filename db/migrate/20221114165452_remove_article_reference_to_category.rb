# frozen_string_literal: true

class RemoveArticleReferenceToCategory < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :articles, :categories
  end
end
