# frozen_string_literal: true

json.title @article.title
json.category do
  json.label @article.category_id ? @article.category.name : ""
  json.value @article.category_id ? @article.category_id : ""
end
json.body @article.body
json.slug @article.slug
json.versions @article.versions
json.id @article.id
json.status @article.status
json.updated_at @article.updated_at
