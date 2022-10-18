# frozen_string_literal: true

class RedirectionsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :load_redirections!, only: %i[show update destroy]

  def index
    @redirections = Redirection.all
  end

  def create
    redirection = Redirection.new(redirection_params)
    redirection.save!
    render status: :ok, json: { notice: "The redirection is successfully created" }
  end

  def show
  end

  def update
    @redirection.update!(redirection_params)
    render status: :ok, json: { notice: "This redirection is successfully updated" }
  end

  def destroy
    @redirection.destroy!
    render status: :ok, json: { notice: "This redirection is successfully deleted" }
  end

  private

    def load_redirections!
      @redirection = Redirection.find_by_id!(params[:id])
    end

    def redirection_params
      params.require(:redirection).permit(:topath, :frompath)
    end
end
