require "uri"

class GithubService
  def initialize
    @client = Octokit::Client.new
  end

  def fetch_remote_repository(uri)
    uri = URI.parse(uri)

    unless "github.com" == uri.host
      raise ArgumentError, "Invalid URL: non 'github.com' URL provided."
    end

    repository = @client.repository(uri.path[1..])

    RemoteRepository.new(
      name: repository.name,
      description: repository.description,
      url: repository.html_url
    )
  rescue Octokit::NotFound
    nil
  end
end
