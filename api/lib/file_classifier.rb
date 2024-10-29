class FileClassifier
  def initialize(filepath)
    @filepath = filepath
  end

  FILE_TYPE_EXTENSIONS = {
    ".c" => "c",
    ".cc" => "c++",
    ".cpp" => "c++",
    ".go" => "go",
    ".h" => "header file",
    ".hs" => "haskell",
    ".java" => "java",
    ".js" => "javascript",
    ".json" => "json",
    ".lhs" => "haskell",
    ".lock" => "lock file",
    ".lua" => "lua",
    ".md" => "markdown",
    ".py" => "python",
    ".rb" => "ruby",
    ".rs" => "rust",
    ".toml" => "toml",
    ".txt" => "plain text"
  }.freeze

  def filetype
    FILE_TYPE_EXTENSIONS.fetch(extension, "unknown")
  end

  def extension
    File.extname(@filepath)
  end
end
