class TreesController < ApplicationController
  def show
    return render_repository_not_found unless current_repository

    Gitland::Repository.new(current_repository)
      .list_all_files_with_size
      .then { |files| render(json: files) }
  end
end
