# frozen_string_literal: true

require "test_helper"

class WebsiteTest < ActiveSupport::TestCase
  def setup
    @website = create(:website)
  end

  def test_website_name_should_not_be_valid_without_name
    @website.name = ""
    assert_not @website.valid?
  end

  def test_website_should_have_unique_auth_token
    @website.save!
    second_website = Website.create(name: "Spinkart2", password: "Welcome12", password_enabled: true)

    assert_not_same @website.authentication_token,
      second_website.authentication_token
  end

  def test_website_should_have_unique_name
    @website.save!
    second_website = Website.create(name: "Spinkart", password: "Welcome12", password_enabled: true)

    assert_not_same @website.name, second_website.name
  end
end
