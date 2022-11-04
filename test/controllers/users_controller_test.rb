# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
  end
end
