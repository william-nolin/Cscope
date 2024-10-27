require "test_helper"

class SourceFileTest < ActiveSupport::TestCase
  test "cannot create two source_files with the same filepath in the same repository " do
    file = SourceFile.create(repository: repositories(:rails), filepath: "Gemfile")
    assert_not(file.valid?)
    assert(file.errors.of_kind?(:filepath, :taken))
  end

  test "#line_count uses gitland internally" do
    source_file = source_files(:test_repository_readme)

    mock_repo = mock()
    mock_repo.expects(:file_line_count).with(source_file.filepath).returns(7)
    Gitland::Repository.expects(:new).with(source_file.repository).returns(mock_repo)

    assert_equal(7, source_file.line_count)
  end

  test "#main_contributor" do
    file = source_files(:test_repository_main)

    assert_equal({ author: "Jonathan Lalande", commits_count: 1 }, file.main_contributor)
  end

  test "#creation_date" do
    assert_equal(DateTime.new(2024, 10, 13), source_files(:test_repository_readme).creation_date)
  end

  test "#last_modification_date" do
    assert_equal(DateTime.new(2024, 10, 27), source_files(:test_repository_readme).last_modification_date)
  end
end
