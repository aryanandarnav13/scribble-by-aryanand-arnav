# frozen_string_literal: true

class WebsitesController < ApplicationController
  def index
    respond_with_json(
      {
        website_name: current_website.name,
        password_enabled: current_website.password_enabled?
      })
  end

  def update
    current_website.update!(website_params)
    respond_with_success(t("successfully_updated", entity: "website"))
  end

  private

    def website_params
      params.require(:website).permit(:name, :password, :password_enabled)
    end
end
