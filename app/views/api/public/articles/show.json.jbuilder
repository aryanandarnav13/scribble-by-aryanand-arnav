# frozen_string_literal: true

json.partial! "api/public/articles/article", article: @article
json.category do
  json.label @article.category.name
  json.value @article.category_id
end
