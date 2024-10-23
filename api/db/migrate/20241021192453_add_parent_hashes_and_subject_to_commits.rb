class AddParentHashesAndSubjectToCommits < ActiveRecord::Migration[8.0]
  def change
    add_column :commits, :parent_hashes, :text
    add_column :commits, :subject, :string
  end
end
