require "test_helper"

class SourceFileTest < ActiveSupport::TestCase
  test "cannot create two source_files with the same filepath in the same repository " do
    file = SourceFile.create(repository: repositories(:rails), filepath: "Gemfile")
    assert_not(file.valid?)
    assert(file.errors.of_kind?(:filepath, :taken))
  end
end
