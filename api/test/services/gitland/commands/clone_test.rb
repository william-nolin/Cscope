require "test_helper"

module Gitland
  module Commands
    class CloneTest < ActiveSupport::TestCase
      def setup
        @repository = repositories(:rails)
      end

      test "#execute clones the repository in the correct gitland storage place" do
        remote_url = @repository.remote_url
        disk_path = Gitland::Storage.new(@repository).absolute_path

        Git.expects(:clone).with(remote_url, disk_path)

        Gitland::Commands::Clone.new(@repository).execute
      end
    end
  end
end
