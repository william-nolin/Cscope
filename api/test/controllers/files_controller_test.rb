require "test_helper"

class FilesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @repository = repositories(:test_repository)
  end

  test "#show returns 404 when the repository does not exists" do
    get "/repositories/9999999999/files/head/README.md"

    assert_response(:not_found)
  end

  test "#show returns 404 when the file does not exists" do
    get "/repositories/#{@repository.id}/files/head/non_existing_file.txt"

    assert_response(:not_found)
    assert_equal("file does not exists.", response.parsed_body[:message])
  end

  test "#show returns 200 when the file exists on the repository" do
    SourceFile.any_instance.stubs(:line_count).returns(69)

    source_file = source_files(:test_repository_main)
    get "/repositories/#{@repository.id}/files/head/#{source_file.filepath}"

    expected_response = {
      "filepath" => "main.rb",
      "filetype" => "ruby",
      "commits_count" => source_file.commits.size,
      "main_contributor" => {
        "author" => "Jonathan Lalande",
        "commits_count" => 1
      },
      "line_count" => 69,
      "creation_date" => source_file.creation_date.as_json,
      "last_modification_date" => source_file.last_modification_date.as_json
    }

    assert_response(:ok)
    assert_equal(expected_response, response.parsed_body)
  end

  test "#change_history returns 404 when the repository does not exists" do
    get "/repositories/9999999999/files/stats/change-history"

    assert_response(:not_found)
  end

  test "#files_over_time returns 404 when the repository does not exist" do
    get "/repositories/9999999999/files/stats/files_over_time"

    assert_response(:not_found)
  end

  test "#change_history returns 200 when the repository exists" do
    get "/repositories/#{@repository.id}/files/stats/change-history"

    expected_response = [
      [ "2024-10-13", "README.md", "create" ],
      [ "2024-10-15", "main.rb", "create" ],
      [ "2024-10-27", "README.md", "modify" ]
    ]

    assert_response(:ok)
    assert_equal(expected_response, response.parsed_body)
  end

  test "#change_history respects the start_date query params filter" do
    get "/repositories/#{@repository.id}/files/stats/change-history?start_date=2024-10-14"

    expected_response = [
      [ "2024-10-15", "main.rb", "create" ],
      [ "2024-10-27", "README.md", "modify" ]
    ]

    assert_response(:ok)
    assert_equal(expected_response, response.parsed_body)
  end

  test "#change_history respects the end_date query params filter" do
    get "/repositories/#{@repository.id}/files/stats/change-history?end_date=2024-10-20"

    expected_response = [
      [ "2024-10-13", "README.md", "create" ],
      [ "2024-10-15", "main.rb", "create" ]
    ]

    assert_response(:ok)
    assert_equal(expected_response, response.parsed_body)
  end

  test "#files_over_time returns 200 if the repository exists" do
    get "/repositories/#{@repository.id}/files/stats/files_over_time"

    assert_response(:ok)
    assert_equal(
      [
        {
          "filepath" => "README.md",
          "total_additions" => 9,
          "total_deletions" => 0,
          "total_modifications" => 9
        },
        {
          "filepath" => "main.rb",
          "total_additions" => 1,
          "total_deletions" => 0,
          "total_modifications" => 1
        }
      ],
      response.parsed_body
    )
  end

  test "#files_over_time output is filtered by `start_date` parameter" do
    get "/repositories/#{@repository.id}/files/stats/files_over_time?start_date=2024-10-15"

    assert_response(:ok)
    assert_equal(
      [
        {
          "filepath" => "README.md",
          "total_additions" => 2,
          "total_deletions" => 0,
          "total_modifications" => 2
        }
      ],
      response.parsed_body
    )
  end

  test "#files_over_time output is filtered by `end_date` parameter" do
    get "/repositories/#{@repository.id}/files/stats/files_over_time?end_date=2024-10-14"

    assert_response(:ok)
    assert_equal(
      [
        {
          "filepath" => "README.md",
          "total_additions" => 7,
          "total_deletions" => 0,
          "total_modifications" => 7
        }
      ],
      response.parsed_body
    )
  end
end
