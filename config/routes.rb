# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      resources :articles, except: %i[new edit] do
        member do
          patch :reorder
          patch :transfer
          patch :restore
        end
      end
      resources :categories, except: %i[new edit] do
        member do
          patch :reorder
        end
      end
      resources :redirections, except: %i[new edit]
      resource :site, except: %i[new edit]
      resource :session, only: %i[create]
      resources :users, only: %i[create index]
      namespace :public do
        resources :articles, only: %i[index show], param: :slug
        resources :categories, only: %i[index]
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
