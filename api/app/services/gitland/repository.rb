module Gitland
  class Repository
    def initialize(repository)
      @repository = repository
    end

    def list_all_files_with_size
      Commands::CommandLsTree.new(@repository, recursive: true, long: true).execute
    end
  end
end
