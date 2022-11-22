# frozen_string_literal: true

class TransferArticleService
  attr_reader :article_ids, :new_category_id, :current_user
  def initialize(article_ids:, new_category_id:, current_user:)
    @_current_user = current_user
    @article_ids = article_ids
    @new_category_id = new_category_id
  end

  def process
    article_ids_array = article_ids.split(",")
    article_ids_array.each do |article_id|
      @_current_user.articles.find_by_id(article_id).remove_from_list
    end
    @_current_user.articles.where(id: article_ids_array).update(category_id: new_category_id)
  end
end
