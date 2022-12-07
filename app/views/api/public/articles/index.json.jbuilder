# frozen_string_literal: true

json.articles @published_articles do |article|
  json.category article.category.name
  json.partial! "api/public/articles/article", article: article
end

