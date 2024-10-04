class CreateRepositories < ActiveRecord::Migration[8.0]
  def change
    create_table :repositories do |t|
      t.string :name
      t.string :domain
      t.string :path
      t.timestamps
    end
  end
end
