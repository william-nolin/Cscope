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
end
