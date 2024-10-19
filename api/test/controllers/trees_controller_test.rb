require "test_helper"

class TreesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @repository = repositories(:rails)
  end

  test "#show returns 404 when the repository does not exists" do
    get "/repositories/99999/tree/head"

    assert_response(:not_found)
  end

  test "#show returns 200 when the repository exists" do
    files = stub_gitland_repository(:list_all_files_with_size) do
      [
        { "filepath" => "Gemfile", "line_count" => 123 },
        { "filepath" => "actionpack/lib/action_pack.rb", "line_count" => 27 }
      ]
    end

    get "/repositories/#{@repository.id}/tree/head"
    assert_response(:ok)
    assert_equal(files, response.parsed_body)
  end

  private

  def stub_gitland_repository(method, &block)
    return_value = block.call
    gitland_repo = mock()
    gitland_repo.stubs(method).returns(return_value)

    Gitland::Repository
      .expects(:new)
      .with(@repository)
      .returns(gitland_repo)

    return_value
  end
end
