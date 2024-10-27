class SourceFile < ApplicationRecord
  belongs_to :repository
  has_many :source_file_changes
  has_many :commits, through: :source_file_changes

  validates :filepath, uniqueness: { scope: :repository_id }

  def line_count
    Gitland::Repository.new(self.repository).file_line_count(self.filepath)
  end

  def main_contributor
    author, count = commits
      .where(for_changes_ledger: false)
      .group(:author)
      .order(Arel.sql("count_id DESC"))
      .limit(1)
      .count(:id)
      .first

    { author: author, commits_count: count }.compact
  end

  def creation_date
    commits.first.committer_date
  end

  def last_modification_date
    commits.last.committer_date
  end
end
