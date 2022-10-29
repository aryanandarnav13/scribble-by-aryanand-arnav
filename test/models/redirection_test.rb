# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = create(:redirection)
  end

  def test_frompath_and_topath_should_not_be_same
    @redirection.frompath = "test"
    @redirection.topath = "test"
    assert_not @redirection.valid?
  end

  def test_simple_nested_cyclic_redirection
    r2 = Redirection.create! frompath: @redirection.topath, topath: "redirection_page_1"
    r3 = Redirection.create! frompath: r2.topath, topath: "redirection_page_3"
    r4 = Redirection.new frompath: r3.topath, topath: @redirection.frompath
    assert_not r4.valid?
    assert_equal ["redirection.redirection_cycle"], r4.errors.full_messages
  end
end
