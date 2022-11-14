# frozen_string_literal: true

class TransferArticleService
  attr_reader :article_ids, :new_category_id, :current_user
  def initialize(article_ids:, new_category_id:, current_user:)
    @_current_user = current_user
    @article_ids = article_ids
    @new_category_id = new_category_id
  end

  def process
    article_ids.split(",").each do |article_id|
      @_current_user.articles.where(id: article_id).update(category_id: new_category_id)
    end
  end
end
