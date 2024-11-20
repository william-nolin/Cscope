# frozen_string_literal: true

class SourceFileChange < ApplicationRecord
  belongs_to :commit
  belongs_to :source_file

  validates :source_file, uniqueness: { scope: :commit_id }

  scope :for_filepath, ->(filepath) { joins(:source_file).find_by(source_file: { filepath: filepath }) }
  scope :sum_line_changes, -> { sum("additions - deletions") }

  FILE_CHANGE_CREATE_CATEGORY = "create"
  FILE_CHANGE_MODIFY_CATEGORY = "modify"
  FILE_CHANGE_DELETE_CATEGORY = "delete"
end
