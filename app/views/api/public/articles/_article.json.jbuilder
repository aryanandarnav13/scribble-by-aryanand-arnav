# frozen_string_literal: true

json.extract! article, :id, :title, :position, :body, :status, :slug
json.date article.published? ? article.updated_at.strftime("%B #{article.updated_at.day.ordinalize}, %Y") : "-"
json.author article.user_id ? article.user.name : ""
