# frozen_string_literal: true

module Gitland
  module Commands
    class Diff < GitCommand
      EMPTY_DIRECTORY_TREE_HASH = "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
      HEAD = "HEAD"

      #
      # Executes `git diff <sha_a> <sha_b>`
      #
      def initialize(repository, filepath: nil, sha_a: nil, sha_b: nil)
        @repository = repository
        @filepath = filepath
        @sha_a = sha_a
        @sha_b = sha_b
      end

      def execute
        cli = Git::CommandLine.new({}, "/usr/bin/git", [], Logger.new("/dev/null"))

        command = [ "diff" ]
        command << "--numstat"
        command << @sha_a if sha1_input_valid?(@sha_a)
        command << @sha_b if sha1_input_valid?(@sha_b)
        command << @filepath if @filepath

        cli.run(
          *command,
          out: nil,
          err: nil,
          chdir: Gitland::Storage.new(@repository).absolute_path,
          normalize: true,
          merge: false,
          chomp: true
        ).stdout
      end

      private

      def sha1_input_valid?(sha1)
        return true if sha1 == "HEAD"

        return false unless sha1
        return false unless sha1.size == 40
        return false unless Integer(sha1, 16, exception: false)

        true
      end
    end
  end
end
