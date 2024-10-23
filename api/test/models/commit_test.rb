require "test_helper"

class CommitTest < ActiveSupport::TestCase
  test "commit_hash is required" do
    commit = commits(:rails_4ad93b)
    commit.commit_hash = ""

    assert_not(commit.valid?)
    assert_equal([ "can't be blank" ], commit.errors[:commit_hash])
  end

  test "cannot have two commit with the same hash in the same repository" do
    duplicated_commit = commits(:rails_4ad93b).dup
    duplicated_commit.save

    assert_not(duplicated_commit.valid?)
    assert_equal([ "has already been taken" ], duplicated_commit.errors[:commit_hash])
  end

  test "two commits can have the same hash accross repositories" do
    original_commit = commits(:rails_4ad93b)

    commit = original_commit.dup
    commit.repository = repositories(:moodle)
    commit.save

    assert(commit.valid?)
  end

  test "serialize/deserialize parent hashes" do
    commit = commits(:rails_4ad93b)
    commit.save

    commit = Commit.find(commit.id)
    assert_equal("2fe1ca0f058c3e9ffd7fa7616e27c03aed8dba7a", commit.parent_hashes[0])
  end
end
