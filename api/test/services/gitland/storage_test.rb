require "test_helper"

module Gitland
  class StorageTest < ActiveSupport::TestCase
    def setup
      @repository = repositories(:example_repository)
      @storage = Gitland::Storage.new(@repository)
    end

    test "#absolute_path returns the absolute path on disk where the repository is stored" do
      hash = Digest::MD5.hexdigest([ @repository.id, @repository.domain, @repository.path ].join(":"))
      assert_equal("#{Gitland::Storage::GITLAND_STORAGE_PATH}/#{hash}", @storage.absolute_path)
    end
  end
end
