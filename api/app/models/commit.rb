class Commit < ApplicationRecord
  belongs_to :repository

  validates :commit_hash,
    presence: true,
    uniqueness: { scope: :repository_id }
end
