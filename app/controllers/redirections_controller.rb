# frozen_string_literal: true

class RedirectionsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :load_redirections!, only: %i[show update destroy]

  def index
    @redirections = Redirection.all
  end

  def create
    Redirection.create!(frompath: "/#{redirection_params[:frompath]}", topath: "/#{redirection_params[:topath]}")
    respond_with_success(t("successfully_created", entity: "Redirection"))
  end

  def show
  end

  def update
    @redirection.update!(frompath: "/#{redirection_params[:frompath]}", topath: "/#{redirection_params[:topath]}")
    respond_with_success(t("successfully_updated", entity: "Redirection"))
  end

  def destroy
    @redirection.destroy!
    respond_with_success(t("successfully_deleted", entity: "Redirection"))
  end

  private

    def load_redirections!
      @redirection = Redirection.find_by_id!(params[:id])
    end

    def redirection_params
      params.require(:redirection).permit(:topath, :frompath)
    end
end
