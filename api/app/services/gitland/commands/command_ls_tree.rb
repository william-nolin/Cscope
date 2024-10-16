module Gitland
  module Commands
    class CommandLsTree < GitCommand
      #
      # Executes `git ls-tree`
      #
      def initialize(repository, recursive: false, long: false)
        @repository = repository
        @recursive = recursive
        @long = long
      end

      def execute
        cli = Git::CommandLine.new({}, "/usr/bin/git", [], Logger.new("/dev/null"))

        command = [ "ls-tree" ]
        command << "-r" if @recursive
        command << "--long" if @long
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
          _, _, _, size, filepath = line.strip.split

          {
            filepath: filepath,
            size: size.to_i
          }
        end
      end
    end
  end
end
