# # frozen_string_literal: true

# class ApplicationController < ActionController::Base
#   include Authenticable
#   include ApiResponders
#   include ApiRescuable

#   before_action :current_website

#   private

#     def current_website
#       @_current_website ||= Website.first
#     end
# end

# frozen_string_literal: true

class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
  rescue_from ActiveRecord::RecordNotUnique, with: :handle_record_not_unique
  rescue_from ActionController::ParameterMissing, with: :handle_api_error

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

  private

    def handle_validation_error(exception)
      respond_with_error(exception)
    end

    def handle_record_not_found(exception)
      respond_with_error(exception.message, :not_found)
    end

    def handle_record_not_unique(exception)
      respond_with_error(exception)
    end

    def handle_api_error(exception)
      respond_with_error(exception, :internal_server_error)
    end

    def respond_with_error(message, status = :unprocessable_entity, context = {})
      is_exception = message.kind_of?(StandardError)
      error_message = is_exception ? message.record&.errors_to_sentence : message
      render status: status, json: { error: error_message }.merge(context)
    end

    def respond_with_success(message, status = :ok, context = {})
      render status: status, json: { notice: message }.merge(context)
    end

    def respond_with_json(json = {}, status = :ok)
      render status: status, json: json
    end
end
