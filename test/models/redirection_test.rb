# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @redirection = create(:redirection, site: @site)
  end

  def test_from_path_and_to_path_should_not_be_same
    @redirection.from = "/test"
    @redirection.to = "/test"
    assert_not @redirection.valid?
    assert_equal [t("redirection.same_path")], @redirection.errors.full_messages
  end

  def test_simple_nested_cyclic_redirection
    r2 = @site.redirections.create! from: @redirection.to, to: "/updated"
    r3 = @site.redirections.create! from: r2.to, to: "/new"
    r4 = @site.redirections.new from: r3.to, to: @redirection.from
    assert_not r4.valid?
    assert_equal [t("redirection.cyclic_redirection")], r4.errors.full_messages
  end

  def test_redirection_should_be_deleted_when_site_is_deleted
    @site.destroy
    assert_empty @site.redirections
  end
end
