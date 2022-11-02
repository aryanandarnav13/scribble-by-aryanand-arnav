# frozen_string_literal: true

class WebsitesController < ApplicationController
  def show
  end

  def update
    current_website.update!(website_params)
    respond_with_success(t("successfully_updated", entity: "Website"))
  end

  private

    def website_params
      params.require(:website).permit(:name, :password, :password_enabled)
    end
end
