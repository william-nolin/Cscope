class RemoteRepository
  #
  # A common interface to represent a remote Git repository.
  #
  def initialize(name:, description:, url:)
    @name = name
    @description = description
    @remote_url = url
    @uri = Addressable::URI.heuristic_parse(url)
  end

  def name
    @name
  end

  def domain
    @uri.domain
  end

  def path
    @uri.path
  end
end
