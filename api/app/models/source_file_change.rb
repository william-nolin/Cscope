class SourceFileChange < ApplicationRecord
  belongs_to :commit
  belongs_to :source_file
end
