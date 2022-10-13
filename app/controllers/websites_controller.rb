# frozen_string_literal: true

class WebsitesController < ApplicationController
  before_action :load_site, only: %i[ update show ]

  def show
  end

  def update
    if @site.update(site_params)
      render status: :ok, json: {
        notice: t("successfully_updated", entity: "Site Details")
      }
    else
      render status: :unprocessable_entity, json: { error: @site.errors.full_messages }
    end
  end

  private

    def site_params
      params.require(:site).permit(:name, :password)
    end

    def load_site
      @site = Site.first
    end
end
