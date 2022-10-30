# frozen_string_literal: true

module Authenticable
  extend ActiveSupport::Concern

  private

    def authenticate_user_using_x_auth_token
      auth_token = request.headers["X-Auth-Token"].presence
      website = Website.first
      if website.password_digest?
        unless website && auth_token &&
          ActiveSupport::SecurityUtils.secure_compare(
            website.authentication_token, auth_token
          )
          render status: :unauthorized, json: {
            error: "could_not_auth"
          }
        end
      end
    end
end
