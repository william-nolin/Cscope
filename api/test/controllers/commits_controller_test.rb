require "test_helper"

class CommitsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @repository = repositories(:test_repository)
  end

  test "#commits_over_time returns 404 if the repository does not exists" do
    get "/repositories/9999999999/commits/stats/commits_over_time"

    assert_response(:not_found)
  end

  test "#commits_over_time returns 200 if the repository exists" do
    get "/repositories/#{@repository.id}/commits/stats/commits_over_time"

    assert_response(:ok)
    assert_equal(
      [
        {
          "date" => "2024-10-13",
          "commits_count" => 1,
          "modified_files" => 1,
          "modified_lines" => 7
        },
        {
          "date" => "2024-10-15",
          "commits_count" => 1,
          "modified_files" => 1,
          "modified_lines" => 1
        }
      ],
      response.parsed_body
    )
  end
end
