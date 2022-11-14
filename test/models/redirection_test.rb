# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @redirection = create(:redirection, site: @site)
  end

  def test_frompath_and_topath_should_not_be_same
    @redirection.frompath = "test"
    @redirection.topath = "test"
    assert_not @redirection.valid?
  end

  def test_simple_nested_cyclic_redirection
    r2 = @site.redirections.create! frompath: @redirection.topath, topath: "redirection_page_1"
    r3 = @site.redirections.create! frompath: r2.topath, topath: "redirection_page_3"
    r4 = @site.redirections.new frompath: r3.topath, topath: @redirection.frompath
    assert_not r4.valid?
    assert_equal ["Cyclic redirection detected"], r4.errors.full_messages
  end
end
