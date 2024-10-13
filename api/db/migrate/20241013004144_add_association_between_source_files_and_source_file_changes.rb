class AddAssociationBetweenSourceFilesAndSourceFileChanges < ActiveRecord::Migration[8.0]
  def change
    remove_column :source_file_changes, :filepath, :string
    add_reference :source_file_changes, :source_file
  end
end
