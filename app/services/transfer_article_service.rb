# frozen_string_literal: true

class TransferArticleService
  attr_reader :article_ids, :new_category_id, :current_user
  def initialize(article_ids:, new_category_id:, current_user:)
    @current_user = current_user
    @article_ids = article_ids
    @new_category_id = new_category_id
  end

  def process
    article_ids.each do |article_id|
      current_user.articles.find(article_id).remove_from_list
    end
    current_user.articles.where(id: article_ids).update(category_id: new_category_id)
  end
end
