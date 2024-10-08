class RepositorySyncService
  def initialize(repository)
    @repository = repository
  end

  def index
    git_repo = GitRepository.new(@repository.remote_url)
    git_repo.clone
    git_repo.logs(format: "||%H||%aN||%cs||%as||") do |logs|
      commit_id = nil

      logs.each do |line|
        line.force_encoding("utf-8")

        next if line == ""

        if line[0] == "|"
          result = Commit.insert(commit_data_from_line(line))
          commit_id = result.first["id"]
        elsif Integer(line[0], exception: false)
          CommitFileChange.insert(commit_file_change_data_from_line(line, commit_id))
        end
      end
    end
  end

  private

  def commit_data_from_line(line)
    _, hash, author, committer_date, author_date = line.split("||")
    {
      repository_id: @repository.id,
      commit_hash: hash,
      author: author,
      committer_date: DateTime.parse(committer_date),
      author_date: DateTime.parse(author_date)
    }
  end

  def commit_file_change_data_from_line(line, commit_id)
    additions, deletions, filepath = line.split("\t", 3)
    {
      commit_id: commit_id,
      filepath: filepath.strip,
      additions: additions,
      deletions: deletions
    }
  end
end
