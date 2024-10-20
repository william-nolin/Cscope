class CommitsController < ApplicationController
  def commits_over_time
    return render_repository_not_found unless repository

    stats = RepositoryStatisticsService
      .new(repository)
      .commits_statistics_by_date
      .map! do |date, commits_count, file_changed, line_changed|
        {
          date: date,
          commits_count: commits_count,
          modified_files: file_changed,
          modified_lines: line_changed
        }
      end

    render(json: stats)
  end

  private

  def repository
    @repository ||= Repository.find_by(id: params[:repository_id])
  end

  def render_repository_not_found
    render(json: [], status: :not_found)
  end
end
