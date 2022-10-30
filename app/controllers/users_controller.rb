# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    users = User.select(:id, :name)
    render status: :ok, json: { users: users }
  end

  def create
    User.create!(user_params)
    respond_with_success(t("successfully_created", entity: "User"))
  end

  private

    def user_params
      params.require(:user).permit(:name, :email)
    end
end
