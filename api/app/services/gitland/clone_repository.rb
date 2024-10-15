module Gitland
  class CloneRepository
    def initialize(repository)
      @repository = repository
    end

    def execute
      repository_storage = Gitland::Storage.new(@repository)

      if repository_storage.cloned?
        raise StandardError, "repository already exists at: #{repository_storage.absolute_path}"
      end

      Git.clone(@repository.remote_url, repository_storage.absolute_path, bare: true)
    end
  end
end
