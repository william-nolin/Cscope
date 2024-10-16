module Gitland
  module Commands
    class ListTreeWithLineNumbers < GitCommand
      EMPTY_DIRECTORY_TREE_HASH = "4b825dc642cb6eb9a060e54bf8d69288fbee4904"

      #
      # Executes `git ls-tree`
      #
      def initialize(repository)
        @repository = repository
      end

      def execute
        cli = Git::CommandLine.new({}, "/usr/bin/git", [], Logger.new("/dev/null"))

        command = [ "diff" ]
        command << "--numstat"
        command << EMPTY_DIRECTORY_TREE_HASH
        command << "HEAD"

        output = cli.run(
          *command,
          out: nil,
          err: nil,
          chdir: Gitland::Storage.new(@repository).absolute_path,
          normalize: true,
          merge: false,
          chomp: true
        ).stdout

        output.lines.map! do |line|
          line_count, _, filepath = line.strip.split

          {
            filepath: filepath,
            line_count: line_count.to_i
          }
        end
      end
    end
  end
end
