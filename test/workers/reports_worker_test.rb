# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class ReportsWorkerTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
  end

  def test_should_attach_the_report_to_the_user
    ReportsWorker.perform_async(@user.id)
    assert @user.reload.report.attached?
  end

  def test_should_remove_already_attached_report_and_then_add_new_one_to_the_user_on_every_download
    ReportsWorker.perform_async(@user.id)
    attachment_id = @user.reload.report.attachment.id
    ReportsWorker.perform_async(@user.id)
    assert_not_equal attachment_id, @user.reload.report.attachment.id
  end
end
