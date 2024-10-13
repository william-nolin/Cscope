class CreateSourceFiles < ActiveRecord::Migration[8.0]
  def change
    create_table :source_files do |t|
      t.references :repository, index: false
      t.string :filepath

      t.index [ :repository_id, :filepath ], unique: true
    end
  end
end
