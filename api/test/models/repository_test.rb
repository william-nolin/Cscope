require "test_helper"

class RepositoryTest < ActiveSupport::TestCase
  include ActiveJob::TestHelper

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

  test ".from_remote_repository builds a new repository from a RemoteRepository" do
    remote_repository = RemoteRepository.new(
      name: "discourse",
      description: "A platform for community discussion. Free, open, simple.",
      url: "https://github.com/discourse/discourse"
    )

    repository = Repository.from_remote_repository(remote_repository)
    assert(repository.new_record?)
    assert_not(repository.persisted?)
    assert_equal("discourse", repository.name)
    assert_equal("github.com", repository.domain)
    assert_equal("/discourse/discourse", repository.path)
  end

  test "#remote_url" do
    assert_equal("https://github.com/rails/rails", repositories(:rails).remote_url)
  end

  test "prevents creation of duplicated repositories on the same domain" do
    repository = Repository.create(name: "rails", domain: "github.com", path: "/rails/rails")
    assert_not(repository.valid?)
    assert(repository.errors.of_kind?(:path, :taken))
  end

  test "does not prevent the creation of duplicated repositories on different domains" do
    assert_nothing_raised do
      Repository.create!(name: "duplicated_repo", domain: "github.com", path: "/example/duplicated_repository")
      Repository.create!(name: "duplicated_repo", domain: "gitlab.com", path: "/example/duplicated_repository")
    end
  end

  test "enqueues a InitializeRepositoryJob after creation" do
    repository = Repository.create(name: "react", domain: "github.com", path: "/facebook/react")
    assert_enqueued_with(job: InitializeRepositoryJob, args: [ { repository_id: repository.id } ])
  end
end
