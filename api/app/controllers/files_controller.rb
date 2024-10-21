class FilesController < ApplicationController
  def show
    return render_repository_not_found unless current_repository

    source_file = current_repository.source_files.find_by(filepath: params[:filepath])
    return render_source_file_not_found unless source_file

    render(json: {
      filepath: source_file.filepath,
      commits_count: source_file.commits.count,
      main_contributor: source_file.main_contributor
    })
  end

  private

  def render_source_file_not_found
    render(json: { message: "file does not exists." }, status: :not_found)
  end
end
