module Gitland
  class Repository
    def initialize(repository)
      @repository = repository
    end

    def clone
      Commands::Clone.new(@repository).execute
    end

    def log(format: nil, first_parent: false)
      Commands::Log.new(@repository, format: format, first_parent: first_parent).execute { |logs| yield logs }
    end

    def list_all_files_with_size
      Commands::ListTreeWithLineNumbers.new(@repository).execute
    end
  end
end
