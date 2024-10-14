require "digest"

module Gitland
  class Storage
    GITLAND_STORAGE_PATH = Rails.root.join("storage", "gitland", "repositories")

    def initialize(repository)
      @repository = repository
    end

    def absolute_path
      GITLAND_STORAGE_PATH.join("#{@repository.id}.git").to_s
    end
  end
end
