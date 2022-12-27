# frozen_string_literal: true

class AddRefrenceToArticleVisits < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :article_visits, :articles, on_delete: :cascade
  end
end
