# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end
end
