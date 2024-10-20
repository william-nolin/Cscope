class InitializeRepositoryJob < ApplicationJob
  queue_as :default

  #
  # Initializes a git repository to be consumed by the application.
  #
  def perform(repository_id:)
    repository = Repository.find_by(id: repository_id)

    unless repository
      return Rails.logger.info("repository #{repository_id} does not exists.")
    end

    Gitland::CloneRepository
      .new(repository)
      .execute
      .then { RepositorySyncJob.perform_later(repository_id: repository.id) }
  end
end
