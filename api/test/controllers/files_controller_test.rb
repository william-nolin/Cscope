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
    get "/repositories/#{@repository.id}/files/head/main.rb"

    expected_response = {
      "filepath" => "main.rb",
      "commits_count" => source_files(:test_repository_main).commits.size,
      "main_contributor" => {
        "author" => "Jonathan Lalande",
        "commits_count" => 2
      }
    }

    assert_response(:ok)
    assert_equal(expected_response, response.parsed_body)
  end
end
