require "test_helper"

module Gitland
  module Commands
    class LogTest < ActiveSupport::TestCase
      def setup
        @repository = repositories(:rails)
      end

      test "#execute calls `git log` with --reverse, --numstat and --summary by default" do
        Git::CommandLine
          .any_instance
          .expects(:run)
          .with do |*args|
            command, reverse, numstat, summary = args
            assert_equal("log", command)
            assert_equal("--reverse", reverse)
            assert_equal("--numstat", numstat)
            assert_equal("--summary", summary)
          end

        Gitland::Commands::Log.new(@repository).execute { }
      end

      test "#execute calls `git log` with the format provided in the initializer" do
        Git::CommandLine
          .any_instance
          .expects(:run)
          .with do |*args|
            command, _, _, _, format, _ = args
            assert_equal("log", command)
            assert_equal("--pretty=format:||%H||%aN||%cs||%as||%P||%s", format)
          end

        Gitland::Commands::Log.new(@repository, format: "||%H||%aN||%cs||%as||%P||%s").execute { }
      end

      test "#execute calls `git log` with --first-parent if its provided in the initializer" do
        Git::CommandLine
          .any_instance
          .expects(:run)
          .with do |*args|
            command, _, _, _, first_parent, _ = args
            assert_equal("log", command)
            assert_equal("--first-parent", first_parent)
          end

        Gitland::Commands::Log.new(@repository, first_parent: true).execute { }
      end

      test "#execute redirect cli output to a temporary file" do
        _, tmp_file = stub_temporary_log_file { "" }

        Git::CommandLine
          .any_instance
          .expects(:run)
          .with do |*args|
            kwargs = args.last
            assert_equal(tmp_file, kwargs[:out])
          end

        Gitland::Commands::Log.new(@repository).execute { }
      end

      test "#execute yields an enumerable of the lines in the temporary log file" do
        log_file, _ = stub_temporary_log_file do
          <<~LOGS
            ||71c23127bf7bad405dd3e8e29f9394140882898c||Jonathan Lalande||2024-10-06||2024-10-06||
            2	0	README.md
             create mode 100644 README.md

            ||3ecab153fab78e61290892881e9a34d0df6fb7a0||Jonathan Lalande||2024-10-10||2024-10-10||
            3	0	README.md
          LOGS
        end

        Git::CommandLine
          .any_instance
          .expects(:run)

        Gitland::Commands::Log.new(@repository).execute do |logs|
          assert_equal(log_file, logs)
        end
      end

      private

      def stub_temporary_log_file(&block)
        log_file = StringIO.new(block.call)

        tmp_file_mock = mock()
        tmp_file_mock.expects(:rewind).once
        tmp_file_mock.stubs(:each_line).returns(log_file)

        Tempfile
          .expects(:create).with(binmode: true)
          .yields(tmp_file_mock)

        return log_file, tmp_file_mock
      end
    end
  end
end
