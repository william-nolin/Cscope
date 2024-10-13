class AddUniqueIndexOnSourceFileChange < ActiveRecord::Migration[8.0]
  def change
    add_index :source_file_changes, [ :source_file_id, :commit_id ], unique: true
  end
end
