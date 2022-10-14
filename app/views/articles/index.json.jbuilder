json.articles @articles do |article|
  json.id article.id
  json.title article.title
  json.body article.body
  json.category article.category_id ? article.Category.name : ""
  json.status article.status
  json.slug article.slug
  json.date article.Publish? ? article.updated_at.strftime("%B #{article.updated_at.day.ordinalize}, %Y")  : "-"
  json.author "Oliver Smith"
end
json.draft @articles.where(status: "Draft").count
json.publish @articles.where(status: "Publish").count
