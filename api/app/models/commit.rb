class Commit < ApplicationRecord
  belongs_to :repository
  has_many :file_changes, class_name: "CommitFileChange"

  validates :commit_hash,
    presence: true,
    uniqueness: { scope: :repository_id }
end
