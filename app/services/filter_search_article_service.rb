# frozen_string_literal: true

class FilterSearchArticleService
  attr_reader :articles, :categories_filter, :search_filter, :status_filter
  def initialize(articles:, categoriesFilter:, searchFilter:, statusFilter:)
    @articles = articles
    @categories_filter = categoriesFilter
    @search_filter = searchFilter
    @status_filter = statusFilter
  end

  def process
    by_category
    by_search
    by_status

    articles
  end

  private

    def by_category
      @articles = articles.where(category_id: categories_filter) if categories_filter
    end

    def by_search
      @articles = articles.where("title ILIKE ?", "%#{search_filter.downcase}%") if search_filter != ""
    end

    def by_status
      @articles = articles.where(status: status_filter) if status_filter != "All"
    end
end
