# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :frompath, uniqueness: true
end
