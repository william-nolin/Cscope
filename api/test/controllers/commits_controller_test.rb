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

  test "#commits_over_time output is filtered by `start_date` parameter" do
    get "/repositories/#{@repository.id}/commits/stats/commits_over_time?start_date=2024-10-14"

    assert_response(:ok)
    assert_equal(
      [
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

  test "#commits_over_time output is filtered by `end_date` parameter" do
    get "/repositories/#{@repository.id}/commits/stats/commits_over_time?end_date=2024-10-14"

    assert_response(:ok)
    assert_equal(
      [
        {
          "date" => "2024-10-13",
          "commits_count" => 1,
          "modified_files" => 1,
          "modified_lines" => 7
        }
      ],
      response.parsed_body
    )
  end

  test "#commits_over_time output is filtered by both `start_date` and `end_date` parameter" do
    get "/repositories/#{@repository.id}/commits/stats/commits_over_time?start_date=2020-01-01&end_date=2021-01-01"

    assert_response(:ok)
    assert_equal([], response.parsed_body)
  end
end
