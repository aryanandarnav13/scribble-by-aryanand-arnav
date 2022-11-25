# frozen_string_literal: true

class Api::SitesController < ApplicationController
  def show
    @site = current_site
  end

  def update
    current_site.update!(site_params)
    respond_with_success(t("successfully_updated", entity: "Site"))
  end

  private

    def site_params
      params.require(:site).permit(:name, :password, :password_enabled)
    end
end
