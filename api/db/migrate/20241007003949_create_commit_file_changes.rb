class CreateCommitFileChanges < ActiveRecord::Migration[8.0]
  def change
    create_table :commit_file_changes do |t|
      t.references :commit
      t.string :filepath
      t.integer :additions, default: 0
      t.integer :deletions, default: 0
    end
  end
end
