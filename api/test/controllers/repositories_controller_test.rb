require "test_helper"

class RepositoriesControllerTest < ActionDispatch::IntegrationTest
  test "returns 404 when the repository does not exists" do
    get "/repositories/9999999999"
    assert_response(:not_found)
  end

  test "returns 200 when the repository exists" do
    repository = repositories(:rails)

    get "/repositories/#{repository.id}"
    assert_response(:ok)
    assert_equal("rails", response.parsed_body[:name])
    assert_equal("github.com", response.parsed_body[:domain])
    assert_equal("/rails/rails", response.parsed_body[:path])
  end
end
