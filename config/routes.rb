# frozen_string_literal: true

Rails.application.routes.draw do

  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit], param: :slug, defaults: { format: "json" }
  end
  resources :categories, only: %i[index create], param: :slug

  root "home#index"
  get "*path", to: "home#index", via: :all
end
