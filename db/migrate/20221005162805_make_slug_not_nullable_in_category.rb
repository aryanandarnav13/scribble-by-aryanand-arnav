# frozen_string_literal: true

class MakeSlugNotNullableInCategory < ActiveRecord::Migration[6.1]
  def change
    change_column_null :categories, :slug, false
  end
end
