class Commit < ApplicationRecord
  belongs_to :repository
  has_many :source_file_changes
  has_many :source_files, through: :source_file_changes

  validates :commit_hash,
    presence: true,
    uniqueness: { scope: :repository_id }
end
