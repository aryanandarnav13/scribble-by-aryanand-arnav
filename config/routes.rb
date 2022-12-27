# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      resources :articles, except: %i[new edit] do
        patch :reorder, on: :member
        patch :transfer, on: :collection
        collection do
          resource :report, only: %i[create], module: :articles do
            get :download, on: :collection
          end
        end
      end
      resources :article_schedules, only: %i[index create destroy]
      resources :article_versions, only: %i[update]
      resources :categories, except: %i[new edit] do
        patch :reorder, on: :member
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
