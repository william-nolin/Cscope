class AddCategoryToSourceFileChange < ActiveRecord::Migration[8.0]
  def change
    add_column :source_file_changes, :category, :string
  end
end
