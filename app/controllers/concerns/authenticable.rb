# frozen_string_literal: true

module Authenticable
  extend ActiveSupport::Concern

  def authenticate_request!
    if current_site.password_enabled?
      auth_token = request.headers["X-Auth-Token"].presence
      is_valid_token = auth_token && ActiveSupport::SecurityUtils.secure_compare(
        current_site.authentication_token,
        auth_token)
      unless is_valid_token
        respond_with_error(t("session.could_not_auth"), :unauthorized)
      end
    end
  end
end
