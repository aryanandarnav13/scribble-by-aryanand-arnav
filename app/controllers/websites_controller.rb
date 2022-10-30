# # frozen_string_literal: true

# class WebsitesController < ApplicationController
#   def index
#     respond_with_json(
#       {
#         website_name: current_website.name,
#         password_enabled: current_website.password_enabled?
#       })
#   end

#   def update
#     current_website.update!(website_params)
#     respond_with_success(t("successfully_updated", entity: "website"))
#   end

#   private

#     def website_params
#       params.require(:website).permit(:name, :password, :password_enabled)
#     end
# end

# frozen_string_literal: true

class WebsitesController < ApplicationController
  before_action :load_website, only: %i[ update show ]

  def show
  end

  def update
    if @website.update(website_params)
      render status: :ok, json: { notice: "This website is successfully updated" }
    else
      render status: :unprocessable_entity, json: { error: @website.errors.full_messages }
    end
  end

  private

    def website_params
      params.require(:website).permit(:name, :password, :password_enabled)
    end

    def load_website
      @website = Website.first
    end
end
