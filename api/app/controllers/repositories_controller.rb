class RepositoriesController < ApplicationController
  def show
    repository = Repository.find_by(id: params[:id])

    if repository
      render(json: repository)
    else
      render(json: nil, status: :not_found)
    end
  end
end
