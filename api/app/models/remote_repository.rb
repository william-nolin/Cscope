class RemoteRepository
  #
  # A common interface to represent a remote Git repository.
  #
  def initialize(name:, description:, url:)
    @name = name
    @descriptoin = description
    @url = url
  end
end
