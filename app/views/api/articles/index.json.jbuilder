# frozen_string_literal: true

json.articles @articles do |article|
  json.id article.id
  json.title article.title
  json.body article.body
  json.updated_at article.updated_at
  json.created_at article.created_at
  json.position article.position
  json.category article.category_id ? article.category.name : ""
  json.status article.status
  json.slug article.slug
  json.views article.views
  json.date article.Publish? ? article.updated_at.strftime("%B #{article.updated_at.day.ordinalize}, %Y") : "-"
  json.author article.user_id ? article.user.name : ""
end
json.draft @articles.select { |article| article.Draft? }.count
json.publish @articles.select { |article| article.Publish? }.count
