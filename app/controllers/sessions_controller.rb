# # frozen_string_literal: true

# class SessionsController < ApplicationController
#   def create
#     unless current_website.authenticate(login_params[:password])
#       respond_with_error("Incorrect credentials, try again.", :unauthorized)
#     end
#   end

#   private

#     def login_params
#       params.require(:session).permit(:password)
#     end
# end

# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @website = Website.first
    unless @website.authenticate(login_params[:password])
      render status: :unauthorized, json: { error: "incorrect_credentials" }
    end
  end

  private

    def login_params
      params.require(:login).permit(:password)
    end
end
