class RenameCommitFileChangesToSourceFileChanges < ActiveRecord::Migration[8.0]
  def change
    remove_index :commit_file_changes, :commit_id
    rename_table :commit_file_changes, :source_file_changes
    add_index :source_file_changes, :commit_id
  end
end
