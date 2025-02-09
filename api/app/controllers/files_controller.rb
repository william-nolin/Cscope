class FilesController < ApplicationController
  CODE_FILETYPES = %w[
    c cpp cs go java js jsx kotlin lua php pl py rb rs scala sh swift ts tsx
  ].freeze

  CONFIG_FILETYPES = %w[
    cfg conf env ini json properties toml xml yaml yml
  ].freeze

  TEST_FILETYPES = %w[
    spec test unittest pytest ctest junit nunit karma mocha rspec jest
  ].freeze

  def show
    return render_repository_not_found unless current_repository

    source_file = current_repository.source_files.find_by(filepath: params[:filepath])
    return render_source_file_not_found unless source_file

    render(json: {
      filepath: source_file.filepath,
      filetype: source_file.filetype,
      commits_count: source_file.commits.count,
      main_contributor: source_file.main_contributor,
      line_count: source_file.line_count,
      creation_date: source_file.creation_date,
      last_modification_date: source_file.last_modification_date
    })
  end

  def change_history
    return render_repository_not_found unless current_repository

    data = RepositoryStatisticsService
      .new(current_repository)
      .file_change_history_by_date(start_date: start_date_filter, end_date: end_date_filter)

    render(json: data)
  end

  def files_over_time
    return render_repository_not_found unless current_repository

    stats = RepositoryStatisticsService
      .new(current_repository)
      .file_modifications_by_date(start_date: start_date_filter, end_date: end_date_filter)
      .map! do |filepath, total_additions, total_deletions, total_modifications|
        {
          filepath: filepath,
          total_additions: total_additions,
          total_deletions: total_deletions,
          total_modifications: total_modifications
        }
      end

    render(json: stats)
  end

  def file_types
    return render_repository_not_found unless current_repository

    render(json: current_repository.source_files.distinct.pluck(:filetype))
  end

  def grouped_file_types
    return render_repository_not_found unless current_repository

    file_types = current_repository.source_files.distinct.pluck(:filetype)

    categorized_files = {
      code: file_types & CODE_FILETYPES,
      config: file_types & CONFIG_FILETYPES,
      tests: file_types & TEST_FILETYPES,
      uncategorized: file_types - (CODE_FILETYPES + CONFIG_FILETYPES + TEST_FILETYPES)
    }

    render json: categorized_files
  end

  private

  def render_source_file_not_found
    render(json: { message: "file does not exists." }, status: :not_found)
  end
end
