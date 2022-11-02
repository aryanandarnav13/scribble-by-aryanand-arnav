# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @website = create(:website)
    @user = create(:user, website: @website)
  end
end
