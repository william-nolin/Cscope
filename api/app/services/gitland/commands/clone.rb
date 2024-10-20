module Gitland
  module Commands
    class Clone < GitCommand
      #
      # Executes the `git clone` command. By default, the repository is cloned
      # at the path that Gitland::Storage dictates.
      #
      # Example:
      #
      #   Gitland::Commands::Clone.new(repository).execute
      #
      def initialize(repository)
        @repository = repository
      end

      def execute
        Git.clone(@repository.remote_url, Gitland::Storage.new(@repository).absolute_path)
      end
    end
  end
end
