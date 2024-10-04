require "test_helper"

class GithubServiceTest < ActiveSupport::TestCase
  def setup
    @service = GithubService.new
  end

  test "#fetch_remote_repository raises an exception when url is not from github.com" do
    assert_raise(ArgumentError) do
      @service.fetch_remote_repository("https://gitlab.com/example/repository")
    end
  end
end
