json.title @article.title
json.category do
  json.label @article.category_id ? @article.Category.name : ""
  json.value @article.category_id ? @article.category_id : ""
end
json.body @article.body
json.slug @article.slug
