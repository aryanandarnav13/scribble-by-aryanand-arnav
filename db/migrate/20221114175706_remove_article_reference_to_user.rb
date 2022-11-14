# frozen_string_literal: true

class RemoveArticleReferenceToUser < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :articles, :users
  end
end
