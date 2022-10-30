# frozen_string_literal: true

# frozen_string_literal: true

json.title @article.title

json.category do
  json.label @article.category_id ? @article.category.name : ""
  json.value @article.category_id ? @article.category_id : ""
end
json.body @article.body
json.slug @article.slug
