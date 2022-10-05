# frozen_string_literal: true

class ChangeArticleColumnType < ActiveRecord::Migration[6.1]
  def change
    change_column(:articles, :title, :string)
    change_column(:articles, :category, :string)
    change_column(:articles, :body, :string)
  end
end
