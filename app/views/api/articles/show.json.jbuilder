# frozen_string_literal: true

json.category do
  json.label @article.category_id ? @article.category.name : ""
  json.value @article.category_id ? @article.category_id : ""
end
json.versions @article.versions
json.restored_at @article.restored_at
json.partial! "api/articles/article", article: @article
