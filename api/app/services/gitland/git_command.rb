module Gitland
  #
  # A simple base class that represents a git command.
  #
  class GitCommand
    def execute
      raise NotImplementedError, "Subclasses must implement a execute method."
    end
  end
end
