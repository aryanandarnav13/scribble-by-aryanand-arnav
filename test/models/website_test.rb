# frozen_string_literal: true

require "test_helper"

class WebsiteTest < ActiveSupport::TestCase
  def setup
    @website = Website.new(
      name: "Spinklet",
      password_digest: "welcome1"
                    )
  end
end
