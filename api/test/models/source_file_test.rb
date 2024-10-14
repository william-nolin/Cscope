require "test_helper"

class SourceFileTest < ActiveSupport::TestCase
  test "cannot create two source_files with the same filepath in the same repository " do
    file = SourceFile.create(repository: repositories(:rails), filepath: "Gemfile")
    assert_not(file.valid?)
    assert(file.errors.of_kind?(:filepath, :taken))
  end

  test "#line_count" do
    assert_equal(7, source_files(:test_repository_readme).line_count)
    assert_equal(1, source_files(:test_repository_main).line_count)
  end

  test "#line_count at a specific revision" do
    revision = commits(:test_repository_6a3e17).id

    assert_equal(7, source_files(:test_repository_readme).line_count(revision_id: revision))
    assert_equal(0, source_files(:test_repository_main).line_count(revision_id: revision))
  end
end
