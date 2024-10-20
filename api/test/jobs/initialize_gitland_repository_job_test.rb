require "test_helper"

class InitializeGitlandRepositoryJobTest < ActiveJob::TestCase
  def setup
    @repository = repositories(:test_repository)
  end

  test "clones the repository" do
    Gitland::CloneRepository.any_instance.expects(:execute).returns(nil)

    InitializeGitlandRepositoryJob.perform_now(repository_id: @repository.id)
  end

  test "enqueues a RepositorySyncJob" do
    Gitland::CloneRepository.any_instance.expects(:execute).returns(nil)

    assert_enqueued_with(job: RepositorySyncJob, args: [ { repository_id: @repository.id } ]) do
      InitializeGitlandRepositoryJob.perform_now(repository_id: @repository.id)
    end
  end
end
