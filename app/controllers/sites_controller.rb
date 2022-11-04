# frozen_string_literal: true

class SitesController < ApplicationController
  before_action :current_site!, except: %i[edit]

  def show
  end

  def update
    @_current_site.update!(site_params)
    respond_with_success(t("successfully_updated", entity: "Site"))
  end

  private

    def site_params
      params.require(:site).permit(:name, :password, :password_enabled)
    end
end
