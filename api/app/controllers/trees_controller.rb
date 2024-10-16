class TreesController < ApplicationController
  def show
    return render_repository_not_found unless repository

    Gitland::Repository.new(repository)
      .list_all_files_with_size
      .then { |files| render(json: files) }
  end

  private

  def repository
    @repository ||= Repository.find_by(id: params[:repository_id])
  end

  def render_repository_not_found
    render(json: [], status: :not_found)
  end
end
