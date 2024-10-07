class CreateCommits < ActiveRecord::Migration[8.0]
  def change
    create_table :commits do |t|
      t.references :repository, index: false
      t.string :commit_hash
      t.string :author
      t.datetime :committer_date
      t.datetime :author_date

      t.index([ :repository_id, :commit_hash ], unique: true)
    end
  end
end
