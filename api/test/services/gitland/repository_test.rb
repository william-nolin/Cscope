require "test_helper"

module Gitland
  class RepositoryTest < ActiveSupport::TestCase
    def setup
      @repository = repositories(:rails)
    end

    test "#list_all_files_with_size calls Commands::Diff internally" do
      mocked_diff_output = <<~OUTPUT
        0       0       Backend/.dockerignore
        54      0       Backend/.github/workflows/docker-image.yml
        3       0       Backend/.gitignore
        11      0       Backend/CHANGELOG.md
      OUTPUT

      command = mock()
      command.expects(:execute).returns(mocked_diff_output).once

      Commands::Diff
        .expects(:new)
        .with(@repository, sha_a: Commands::Diff::EMPTY_DIRECTORY_TREE_HASH, sha_b: Commands::Diff::HEAD)
        .returns(command)

      expected_output = [
        { filepath: "Backend/.dockerignore", line_count: 0 },
        { filepath: "Backend/.github/workflows/docker-image.yml", line_count: 54 },
        { filepath: "Backend/.gitignore", line_count: 3 },
        { filepath: "Backend/CHANGELOG.md", line_count: 11 }
      ]

      assert_equal(
        expected_output,
        Gitland::Repository.new(@repository).list_all_files_with_size
      )
    end

    test "#file_line_count calls Commands::Diff internally" do
      mocked_diff_output = <<~OUTPUT
        55      0       api/Gemfile
      OUTPUT

      command = mock()
      command.expects(:execute).returns(mocked_diff_output).once

      Commands::Diff
        .expects(:new)
        .with(
          @repository,
          filepath: "api/Gemfile",
          sha_a: Commands::Diff::EMPTY_DIRECTORY_TREE_HASH,
          sha_b: Commands::Diff::HEAD
        )
        .returns(command)

      assert_equal(55, Gitland::Repository.new(@repository).file_line_count("api/Gemfile"))
    end

    test "#destroy removes the repository from disk" do
      FileUtils
        .expects(:remove_dir)
        .with(Gitland::Storage.new(@repository).absolute_path, force: true)

      Gitland::Repository.new(@repository).destroy
    end
  end
end
