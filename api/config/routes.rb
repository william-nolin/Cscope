Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  if Rails.env.development?
     # Dashboard and Active Job extensions to operate and troubleshoot background jobs
     mount MissionControl::Jobs::Engine, at: "/jobs"
  end

  get "/repositories/search", to: "repositories#search"
  get "/repositories/:repository_id", to: "repositories#show"
  post "/repositories", to: "repositories#create"
  post "/repositories/:repository_id/sync", to: "repositories#sync"

  get "/repositories/:repository_id/tree/head", to: "trees#show"

  get "/repositories/:repository_id/files/head/*filepath", to: "files#show", format: false
  get "/repositories/:repository_id/files/stats/change-history", to: "files#change_history"
  get "/repositories/:repository_id/files/stats/files_over_time", to: "files#files_over_time"
  get "/repositories/:repository_id/files/stats/file_types", to: "files#file_types"
  get "/repositories/:repository_id/files/stats/file_types", to: "files#file_types"
  get "/repositories/:repository_id/files/stats/grouped_file_types", to: "files#grouped_file_types"

  get "/repositories/:repository_id/commits/stats/commits_over_time", to: "commits#commits_over_time"
end
