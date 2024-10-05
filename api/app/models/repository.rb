class Repository < ApplicationRecord
  def self.find_by_url(url)
    uri = Addressable::URI.heuristic_parse(url)
    return nil if uri.domain.nil? || uri.path.nil?

    find_by(domain: uri.domain, path: uri.path)
  end
end
