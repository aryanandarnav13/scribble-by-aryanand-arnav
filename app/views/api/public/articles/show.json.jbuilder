# frozen_string_literal: true

json.title @article.title
json.category do
  json.label @article.category_id ? @article.category.name : ""
  json.value @article.category_id ? @article.category_id : ""
end
json.body @article.body
json.date @article.Publish? ? @article.updated_at.strftime("%B #{@article.updated_at.day.ordinalize}, %Y") : "-"
