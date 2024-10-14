class AddForChangesLedgerToCommits < ActiveRecord::Migration[8.0]
  def change
    add_column :commits, :for_changes_ledger, :boolean, default: false
  end
end
