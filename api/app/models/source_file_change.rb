class SourceFileChange < ApplicationRecord
  belongs_to :commit
  belongs_to :source_file

  validates :source_file, uniqueness: { scope: :commit_id }

  scope :for_filepath, ->(filepath) { joins(:source_file).find_by(source_file: { filepath: filepath }) }
end
