class CommitsController < ApplicationController
  def commits_over_time
    return render_repository_not_found unless current_repository

    stats = RepositoryStatisticsService
      .new(current_repository)
      .commits_statistics_by_date(start_date: start_date_filter, end_date: end_date_filter)
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

  def start_date_filter
    DateTime.parse(params[:start_date])
  rescue
    nil
  end

  def end_date_filter
    DateTime.parse(params[:end_date])
  rescue
    nil
  end
end
