# frozen_string_literal: true

class Api::RedirectionsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :current_site!, except: %i[new edit]
  before_action :load_redirection!, only: %i[show update destroy]

  def index
    @redirections = @_current_site.redirections
  end

  def create
    @_current_site.redirections.create!(redirection_params)
    respond_with_success(t("successfully_created", entity: "Redirection"))
  end

  def show
    render
  end

  def update
    @redirection.update!(redirection_params)
    respond_with_success(t("successfully_updated", entity: "Redirection"))
  end

  def destroy
    @redirection.destroy!
    respond_with_success(t("successfully_deleted", entity: "Redirection"))
  end

  private

    def load_redirection!
      @redirection = @_current_site.redirections.find(params[:id])
    end

    def redirection_params
      params.require(:redirection).permit(:topath, :frompath)
    end
end
