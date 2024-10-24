require "test_helper"

class RepositorySyncServiceTest < ActiveSupport::TestCase
  def setup
    @repository = repositories(:example_repository)
  end

  test "#index creates commits for the given repository" do
    stub_git_commit_history_for_line_counts { "" }
    stub_git_commit_history do
      <<~GIT_LOGS
        ||71c23127bf7bad405dd3e8e29f9394140882898c||Jonathan Lalande||2024-10-06||2024-10-06||
        2	0	README.md
         create mode 100644 README.md

        ||3ecab153fab78e61290892881e9a34d0df6fb7a0||Jonathan Lalande||2024-10-10||2024-10-10||
        3	0	README.md
      GIT_LOGS
    end

    RepositorySyncService.new(@repository).index

    commit_a = @repository.commits.find_by(commit_hash: "71c23127bf7bad405dd3e8e29f9394140882898c")
    assert_equal("Jonathan Lalande", commit_a.author)
    assert_equal(DateTime.parse("2024-10-06"), commit_a.committer_date.to_datetime)
    assert_equal(DateTime.parse("2024-10-06"), commit_a.author_date.to_datetime)

    commit_b = @repository.commits.find_by(commit_hash: "3ecab153fab78e61290892881e9a34d0df6fb7a0")
    assert_equal("Jonathan Lalande", commit_b.author)
    assert_equal(DateTime.parse("2024-10-10"), commit_b.committer_date.to_datetime)
    assert_equal(DateTime.parse("2024-10-10"), commit_b.author_date.to_datetime)
  end

  test "#index creates source_file_changes for each commits" do
    stub_git_commit_history_for_line_counts { "" }
    stub_git_commit_history do
      <<~GIT_LOGS
        ||3ecab153fab78e61290892881e9a34d0df6fb7a0||Jonathan Lalande||2024-10-06||2024-10-06||l3gitpar3ntha5h yupt0ta11yl3git||some kind of subject
        3	0	README.md

        ||c8ab6fe877522729d4088dc7bce64b560d56a324||Jonathan Lalande||2024-10-07||2024-10-07||l3gitpar3ntha5h yupt0ta11yl3git||some kind of subject
        21	0	LICENSE
        0	3	README.md
        1	0	main.rb
         create mode 100644 LICENSE
         create mode 100644 main.rb
      GIT_LOGS
    end

    RepositorySyncService.new(@repository).index

    commit = @repository.commits.find_by(commit_hash: "3ecab153fab78e61290892881e9a34d0df6fb7a0")
    change = commit.source_file_changes.for_filepath("README.md")
    assert_equal(3, change.additions)
    assert_equal(0, change.deletions)

    commit = @repository.commits.find_by(commit_hash: "c8ab6fe877522729d4088dc7bce64b560d56a324")
    change = commit.source_file_changes.for_filepath("LICENSE")
    assert_equal(21, change.additions)
    assert_equal(0, change.deletions)

    change = commit.source_file_changes.for_filepath("README.md")
    assert_equal(0, change.additions)
    assert_equal(3, change.deletions)

    change = commit.source_file_changes.for_filepath("main.rb")
    assert_equal(1, change.additions)
    assert_equal(0, change.deletions)
  end

  test "#index creates source_files for each file in the log" do
    stub_git_commit_history_for_line_counts { "" }
    stub_git_commit_history do
      <<~GIT_LOGS
        ||3ecab153fab78e61290892881e9a34d0df6fb7a0||Jonathan Lalande||2024-10-06||2024-10-06||l3gitpar3ntha5h yupt0ta11yl3git||some kind of subject
        3	0	README.md

        ||c8ab6fe877522729d4088dc7bce64b560d56a324||Jonathan Lalande||2024-10-07||2024-10-07||l3gitpar3ntha5h yupt0ta11yl3git||some kind of subject
        21	0	LICENSE
        0	3	README.md
        1	0	main.rb
         create mode 100644 LICENSE
         create mode 100644 main.rb
      GIT_LOGS
    end

    RepositorySyncService.new(@repository).index

    assert_not_nil(@repository.source_files.find_by(filepath: "README.md"))
    assert_not_nil(@repository.source_files.find_by(filepath: "LICENSE"))
    assert_not_nil(@repository.source_files.find_by(filepath: "main.rb"))
  end

  test "#index creates source_file_changes for merge commits" do
    stub_git_commit_history do
      # The empty lines here represents merge commits.
      # `git log --numstat` don't show stats about merge commits.
      #
      <<~GIT_LOGS
        ||fdeba4af9036551e029591e64780a5b5ad6aab98||Ryuta Kamizono||2024-10-13||2024-10-13||
        ||f942221d4629ce10a259a6adf92eccc559955770||Ryuta Kamizono||2024-10-13||2024-10-13||
        ||28a8fa54deaf87843cf653a2ce9684b14548c1e6||Yusuke Nakamura||2024-10-13||2024-10-13||
        6	2	guides/assets/javascripts/guides.js

        ||f9ec1ae62e21a278128a94b46f99a3928dd32f0e||Hartley McGuire||2024-10-12||2024-10-12||
      GIT_LOGS
    end

    stub_git_commit_history_for_line_counts do
      # `git log -m --first-parent --numstat` returns the accurate log of additions / deletions
      # that sums up to the final state of the repository.
      #
      <<~GIT_LOGS
        ||fdeba4af9036551e029591e64780a5b5ad6aab98||Ryuta Kamizono||2024-10-13||2024-10-13||
        9	0	activerecord/test/cases/date_time_test.rb
        4	0	activerecord/test/config.example.yml

        ||f942221d4629ce10a259a6adf92eccc559955770||Ryuta Kamizono||2024-10-13||2024-10-13||
        6	2	guides/assets/javascripts/guides.js

        ||f9ec1ae62e21a278128a94b46f99a3928dd32f0e||Hartley McGuire||2024-10-12||2024-10-12||
        1	1	guides/source/getting_started.md
      GIT_LOGS
    end

    RepositorySyncService.new(@repository).index

    commit = @repository.commits.find_by(commit_hash: "fdeba4af9036551e029591e64780a5b5ad6aab98")
    change = commit.source_file_changes.for_filepath("activerecord/test/cases/date_time_test.rb")
    assert_equal(9, change.additions)
    assert_equal(0, change.deletions)

    change = commit.source_file_changes.for_filepath("activerecord/test/config.example.yml")
    assert_equal(4, change.additions)
    assert_equal(0, change.deletions)

    commit = @repository.commits.find_by(commit_hash: "f942221d4629ce10a259a6adf92eccc559955770")
    change = commit.source_file_changes.for_filepath("guides/assets/javascripts/guides.js")
    assert_equal(6, change.additions)
    assert_equal(2, change.deletions)

    commit = @repository.commits.find_by(commit_hash: "f9ec1ae62e21a278128a94b46f99a3928dd32f0e")
    change = commit.source_file_changes.for_filepath("guides/source/getting_started.md")
    assert_equal(1, change.additions)
    assert_equal(1, change.deletions)
  end

  test "#index marks commits for changes ledger" do
    stub_git_commit_history do
      <<~GIT_LOGS
        ||f9ec1ae62e21a278128a94b46f99a3928dd32f0e||Hartley McGuire||2024-10-12||2024-10-12||
        ||28a8fa54deaf87843cf653a2ce9684b14548c1e6||Yusuke Nakamura||2024-10-13||2024-10-13||
        6	2	guides/assets/javascripts/guides.js

        ||f942221d4629ce10a259a6adf92eccc559955770||Ryuta Kamizono||2024-10-13||2024-10-13||
        ||fdeba4af9036551e029591e64780a5b5ad6aab98||Ryuta Kamizono||2024-10-13||2024-10-13||
      GIT_LOGS
    end

    stub_git_commit_history_for_line_counts do
      <<~GIT_LOGS
        ||f9ec1ae62e21a278128a94b46f99a3928dd32f0e||Hartley McGuire||2024-10-12||2024-10-12||
        1	1	guides/source/getting_started.md

        ||f942221d4629ce10a259a6adf92eccc559955770||Ryuta Kamizono||2024-10-13||2024-10-13||
        6	2	guides/assets/javascripts/guides.js

        ||fdeba4af9036551e029591e64780a5b5ad6aab98||Ryuta Kamizono||2024-10-13||2024-10-13||
        9	0	activerecord/test/cases/date_time_test.rb
        4	0	activerecord/test/config.example.yml
      GIT_LOGS
    end

    RepositorySyncService.new(@repository).index

    commits_for_ledger, commits = @repository.commits.order(:id).partition(&:for_changes_ledger)
    assert_equal([ "28a8fa54deaf87843cf653a2ce9684b14548c1e6" ], commits.map(&:commit_hash))
    assert_equal(
      [
        "f9ec1ae62e21a278128a94b46f99a3928dd32f0e",
        "f942221d4629ce10a259a6adf92eccc559955770",
        "fdeba4af9036551e029591e64780a5b5ad6aab98"
      ],
      commits_for_ledger.map(&:commit_hash)
    )
  end

  private

  def stub_git_commit_history(&block)
    logs_enumerator = (block.call).lines.each

    command = mock()
    command.expects(:execute).yields(logs_enumerator)

    Gitland::Commands::Log
      .expects(:new)
      .with(anything, format: "||%H||%aN||%cs||%as||%P||%s", first_parent: false)
      .returns(command)
      .at_least_once
  end

  def stub_git_commit_history_for_line_counts(&block)
    logs_enumerator = (block.call).lines.each

    command = mock()
    command.expects(:execute).yields(logs_enumerator)

    Gitland::Commands::Log
      .expects(:new)
      .with(anything, format: "||%H||%aN||%cs||%as||%P||%s", first_parent: true)
      .returns(command)
      .at_least_once
  end
end
