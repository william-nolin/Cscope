require "test_helper"

class RepositoryTest < ActiveSupport::TestCase
  test ".find_by_url returns nil when the url is not valid" do
    assert_nil(Repository.find_by_url("garbage url"))
  end

  test ".find_by_url returns nil if no repositories matches the url" do
    assert_nil(Repository.find_by_url("https://github.com/example/repository"))
  end

  test ".find_by_url returns a repository that matches the url" do
    assert_equal(repositories(:rails), Repository.find_by_url("https://github.com/rails/rails"))
  end

  test ".find_by_url returns a repository even when the scheme is missing" do
    assert_equal(repositories(:rails), Repository.find_by_url("github.com/rails/rails"))
  end
end
