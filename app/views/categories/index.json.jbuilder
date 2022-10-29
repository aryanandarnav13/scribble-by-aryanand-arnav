# frozen_string_literal: true

json.categories @categories do |category|
  json.extract! category, :id, :name, :position, :user_id
  json.count category.articles.count
end
