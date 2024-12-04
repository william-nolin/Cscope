module Gitland
  module Commands
    class Log < GitCommand
      #
      # Executes the `git log` command on a repository.
      # Yields an enumerator of lines on the output.
      #
      # The command is called with following flag by default:
      #   --reverse
      #   --numstat
      #   --summary
      #
      # Example:
      #
      #   Gitland::Commands::Log.new(repository).execute do |logs|
      #     logs.each do |line|
      #       # do something with the line...
      #     end
      #   end
      #
      def initialize(repository, from: nil, format: nil, first_parent: false)
        @repository = repository
        @from = from
        @format = format
        @first_parent = first_parent
      end

      def execute
        return unless block_given?

        cli = Git::CommandLine.new({}, "/usr/bin/git", [], Logger.new("/dev/null"))

        command = [ "log" ]
        command << "--reverse"
        command << "--no-renames"
        command << "--numstat"
        command << "--summary"
        command << "--first-parent" if @first_parent
        command << "--pretty=format:#{@format}" if @format
        command << "#{@from}..HEAD" if @from

        Tempfile.create(binmode: true) do |f|
          cli.run(
            *command,
            out: f,
            err: nil,
            chdir: Gitland::Storage.new(@repository).absolute_path,
            normalize: true,
            merge: false,
            chomp: true
          )

          f.rewind
          yield f.each_line
        end
      end
    end
  end
end
