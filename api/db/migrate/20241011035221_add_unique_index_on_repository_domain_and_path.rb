class AddUniqueIndexOnRepositoryDomainAndPath < ActiveRecord::Migration[8.0]
  def change
    add_index :repositories, [ :domain, :path ], unique: true
  end
end
