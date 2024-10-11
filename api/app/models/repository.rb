class Repository < ApplicationRecord
  has_many :commits

  after_create_commit { RepositorySyncJob.perform_later(repository_id: id) }

  def self.find_by_url(url)
    uri = Addressable::URI.heuristic_parse(url)
    return nil if uri.domain.nil? || uri.path.nil?

    find_by(domain: uri.domain, path: uri.path)
  end

  def self.from_remote_repository(remote_repository)
    new.tap do |repository|
      repository.name = remote_repository.name
      repository.domain = remote_repository.domain
      repository.path = remote_repository.path
    end
  end

  def remote_url
    Addressable::URI.new.tap do |u|
      u.host = self.domain
      u.path = self.path
      u.scheme = "https"
    end.to_s
  end
end
