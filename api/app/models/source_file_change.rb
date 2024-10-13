class SourceFileChange < ApplicationRecord
  belongs_to :commit
  belongs_to :source_file

  validates :source_file, uniqueness: { scope: :commit_id }
end
