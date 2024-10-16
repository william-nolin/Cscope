require "test_helper"

module Gitland
  class StorageTest < ActiveSupport::TestCase
    def setup
      @repository = repositories(:example_repository)
      @storage = Gitland::Storage.new(@repository)
    end

    test "#absolute_path returns the absolute path on disk where the repository is stored" do
      assert_equal("#{Gitland::Storage::GITLAND_STORAGE_PATH}/#{@repository.id}.git", @storage.absolute_path)
    end
  end
end
