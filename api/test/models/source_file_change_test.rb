require "test_helper"

class SourceFileChangeTest < ActiveSupport::TestCase
  test "cannot have 2 changes for a file on the same commit" do
    duplicated_change = source_file_changes(:rails_4ad93b_Gemfile).dup
    assert_not(duplicated_change.valid?)
    assert(duplicated_change.errors.of_kind?(:source_file, :taken))
  end
end
