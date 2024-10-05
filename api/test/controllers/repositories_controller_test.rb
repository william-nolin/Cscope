require "test_helper"
require "minitest/mock"

class RepositoriesControllerTest < ActionDispatch::IntegrationTest
  test "#show returns 404 when the repository does not exists" do
    get "/repositories/9999999999"

    assert_response(:not_found)
  end

  test "#show returns 200 when the repository exists" do
    repository = repositories(:rails)

    get "/repositories/#{repository.id}"

    assert_response(:ok)
    assert_equal("rails", response.parsed_body[:name])
    assert_equal("github.com", response.parsed_body[:domain])
    assert_equal("/rails/rails", response.parsed_body[:path])
  end

  test "#create returns 200 if the repository already exists" do
    repository = repositories(:rails)

    params = { url: "https://github.com/rails/rails" }
    post("/repositories", params: params, as: :json)

    assert_response(:ok)
    assert_equal(repository.id, response.parsed_body[:id])
  end

  test "#create returns 404 if the remote repository does not exists" do
    stub_remote_repository(nil) do
      params = { url: "https://github.com/example/random-repo-123456789" }
      post("/repositories", params: params, as: :json)

      assert_response(:not_found)
    end
  end

  test "#create returns 201 if the repository is created" do
    remote_repository = RemoteRepository.new(
      name: "discourse",
      description: "A platform for community discussion. Free, open, simple.",
      url: "https://github.com/discourse/discourse"
    )

    stub_remote_repository(remote_repository) do
      params = { url: "https://github.com/discourse/discourse" }
      post("/repositories", params: params, as: :json)

      assert_response(:created)
    end
  end

  private

  def stub_remote_repository(remote_repository)
    mock = Minitest::Mock.new
    mock.expect(:fetch_remote_repository, remote_repository, [ String ])

    GithubService.stub(:new, mock) do
      yield
    end
  end
end
