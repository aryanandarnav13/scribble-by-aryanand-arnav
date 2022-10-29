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
      params.require(:website).permit(:name, :password)
    end

    def load_website
      @website = Website.first
    end
end
