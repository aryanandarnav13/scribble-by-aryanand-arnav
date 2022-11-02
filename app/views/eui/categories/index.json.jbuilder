# frozen_string_literal: true

json.categories @categories do | category |
  json.extract! category,
    :id,
    :name,
    :position
  json.articles category.articles
end


