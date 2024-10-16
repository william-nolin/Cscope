Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  if Rails.env.development?
     # Dashboard and Active Job extensions to operate and troubleshoot background jobs
     mount MissionControl::Jobs::Engine, at: "/jobs"
  end

  get "/repositories/:id", to: "repositories#show"
  post "/repositories", to: "repositories#create"

  get "/repositories/:repository_id/tree/head", to: "trees#show"
end
