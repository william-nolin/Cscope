class SourceFile < ApplicationRecord
  belongs_to :repository

  validates :filepath, uniqueness: { scope: :repository_id }
end
