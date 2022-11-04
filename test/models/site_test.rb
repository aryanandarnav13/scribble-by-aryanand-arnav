# frozen_string_literal: true

require "test_helper"

class SiteTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
  end

  def test_site_name_should_not_be_valid_without_name
    @site.name = ""
    assert_not @site.valid?
  end

  def test_site_should_have_unique_auth_token
    @site.save!
    second_site = Site.create(name: "Spinkart2", password: "Welcome12", password_enabled: true)

    assert_not_same @site.authentication_token,
      second_site.authentication_token
  end

  def test_site_should_have_unique_name
    @site.save!
    second_site = Site.create(name: "Spinkart", password: "Welcome12", password_enabled: true)

    assert_not_same @site.name, second_site.name
  end
end
