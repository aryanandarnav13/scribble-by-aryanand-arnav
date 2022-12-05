# frozen_string_literal: true

json.articles @published_articles do |article|
  json.id article.id
  json.title article.title
  json.position article.position
  json.body article.body
  json.category article.category_id ? article.category.name : ""
  json.status article.status
  json.views_date article.views.where(article_id: article.id).group_by_day(:created_at).count
  json.views article.views.where(article_id: article.id).count
  json.slug article.slug
  json.date article.Publish? ? article.updated_at.strftime("%B #{article.updated_at.day.ordinalize}, %Y") : "-"
  json.author article.user_id ? article.user.name : ""
end
 json.published_articles_count @published_articles_count
