# frozen_string_literal: true

json.articles @articles do |article|
  json.created_at article.created_at
  json.position article.position
  json.category article.category.name
  json.views_date article.article_visits.where(article_id: article.id).group_by_day(:created_at).count
  json.views article.article_visits.where(article_id: article.id).count
  json.date article.published? ? article.updated_at.strftime("%B #{article.updated_at.day.ordinalize}, %Y") : "-"
  json.author article.user_id ? article.user.name : ""
  json.partial! "api/articles/article", article: article
end
json.drafted @drafted_articles_count
json.published @published_articles_count
