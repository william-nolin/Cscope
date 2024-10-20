class AddIndexOnCommitsCommitterDate < ActiveRecord::Migration[8.0]
  def change
    add_index :commits, [ :repository_id, :for_changes_ledger, :committer_date ]
  end
end
