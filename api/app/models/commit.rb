class Commit < ApplicationRecord
  belongs_to :repository
  has_many :commit_file_changes

  validates :commit_hash,
    presence: true,
    uniqueness: { scope: :repository_id }
end
