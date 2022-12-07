# frozen_string_literal: true

class ChangeRedirectionColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :redirections, :frompath, :from
    rename_column :redirections, :topath, :to
  end
end
