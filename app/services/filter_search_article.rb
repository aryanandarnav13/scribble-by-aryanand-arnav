# frozen_string_literal: true

class FilterSearchArticle
  attr_reader :articles, :categoriesFilter, :searchFilter, :statusFilter
  def initialize(articles:, categoriesFilter:, searchFilter:, statusFilter:)
    @articles = articles
    @categoriesFilter = categoriesFilter
    @searchFilter = searchFilter
    @statusFilter = statusFilter
  end

  def process
    if categoriesFilter != nil
      @articles = @articles.where(category_id: categoriesFilter)
    end
    if searchFilter != ""
      @articles = @articles.where("title LIKE ?", "%#{searchFilter}%")
    end
    if statusFilter != "All"
      @articles = @articles.where(status: statusFilter)
    end
    @articles
  end
end
