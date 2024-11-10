require "test_helper"

class RemoteRepositoryTest < ActiveSupport::TestCase
  def setup
    @remote_repository = RemoteRepository.new(
      name: "discourse",
      description: "A platform for community discussion. Free, open, simple.",
      url: "https://github.com/discourse/discourse"
    )
  end

  test "#name" do
    assert_equal("discourse", @remote_repository.name)
  end

  test "#domain" do
    assert_equal("github.com", @remote_repository.domain)
  end

  test "#path" do
    assert_equal("/discourse/discourse", @remote_repository.path)
  end

  test "#as_json" do
    assert_equal(
      {
        name: "discourse",
        description: "A platform for community discussion. Free, open, simple.",
        domain: "github.com",
        path: "/discourse/discourse",
        url: "https://github.com/discourse/discourse"
      },
      @remote_repository.as_json
    )
  end
end
