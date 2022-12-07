# frozen_string_literal: true

class ChangeArticleDefaultStatus < ActiveRecord::Migration[6.1]
  def change
    change_column_default :articles, :status, from: "Draft", to: "drafted"
  end
end
