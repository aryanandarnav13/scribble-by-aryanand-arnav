# frozen_string_literal: true

module ApiRescuable
  extend ActiveSupport::Concern
  included do
    rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
    rescue_from ActiveRecord::RecordNotUnique, with: :handle_record_not_unique
    rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
    rescue_from ActionController::ParameterMissing, with: :handle_api_error
  end

  def handle_validation_error(exception)
    respond_with_error(exception)
  end
end
