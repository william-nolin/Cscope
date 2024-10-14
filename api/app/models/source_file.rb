class SourceFile < ApplicationRecord
  belongs_to :repository
  has_many :source_file_changes
  has_many :commits, through: :source_file_changes

  validates :filepath, uniqueness: { scope: :repository_id }

  def line_count(revision_id: nil)
    source_file_changes.then do |changes|
      changes = changes.joins(:commit)
      changes = changes.merge(Commit.on_changes_ledger)
      changes = changes.merge(Commit.where(id: ..revision_id)) if revision_id
      changes.sum_line_changes
    end
  end
end
