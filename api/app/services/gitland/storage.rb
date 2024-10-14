require "digest"

module Gitland
  class Storage
    GITLAND_STORAGE_PATH = Rails.root.join("storage", "gitland", "repositories")

    def initialize(repository)
      @repository = repository
    end

    def absolute_path
      GITLAND_STORAGE_PATH.join(repository_hash).to_s
    end

    private

    def repository_hash
      Digest::MD5.hexdigest([ @repository.id, @repository.domain, @repository.path ].join(":"))
    end
  end
end
