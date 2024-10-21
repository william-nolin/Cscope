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
  end
end
