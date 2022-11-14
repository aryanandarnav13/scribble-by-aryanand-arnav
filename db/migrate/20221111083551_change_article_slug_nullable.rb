# frozen_string_literal: true

class ChangeArticleSlugNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :articles, :slug, true
  end
end
