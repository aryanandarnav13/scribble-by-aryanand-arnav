# frozen_string_literal: true

class RemoveCategoryReferenceToUser < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :categories, :users
  end
end
