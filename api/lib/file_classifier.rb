# frozen_string_literal: true

class FileClassifier
  def initialize(filepath)
    @filepath = filepath
  end

  FILE_TYPE_EXTENSIONS = {
    ".a" => "static library",
    ".asm" => "assembly",
    ".bash" => "bash script",
    ".bat" => "batch script",
    ".c" => "c",
    ".cc" => "c++",
    ".conf" => "configuration file",
    ".cpp" => "c++",
    ".cs" => "c#",
    ".css" => "css",
    ".csv" => "csv",
    ".dart" => "dart",
    ".db" => "database file",
    ".dll" => "dynamic link library",
    ".ear" => "enterprise archive",
    ".exe" => "executable",
    ".go" => "go",
    ".h" => "header file",
    ".hpp" => "c++ header file",
    ".hs" => "haskell",
    ".htm" => "html",
    ".html" => "html",
    ".ini" => "configuration file",
    ".ipynb" => "jupyter notebook",
    ".jar" => "java archive",
    ".java" => "java",
    ".jl" => "julia",
    ".js" => "javascript",
    ".json" => "json",
    ".jsx" => "javascript (React)",
    ".kt" => "kotlin",
    ".less" => "less",
    ".lhs" => "haskell",
    ".lock" => "lock file",
    ".log" => "log file",
    ".lua" => "lua",
    ".m" => "objective-c",
    ".md" => "markdown",
    ".mm" => "objective-c++",
    ".o" => "object file",
    ".php" => "php",
    ".pl" => "perl",
    ".ps1" => "powershell script",
    ".py" => "python",
    ".r" => "r",
    ".rb" => "ruby",
    ".rs" => "rust",
    ".scala" => "scala",
    ".scss" => "sass",
    ".sh" => "shell script",
    ".so" => "shared object",
    ".sql" => "sql",
    ".swift" => "swift",
    ".toml" => "toml",
    ".ts" => "typescript",
    ".tsv" => "tsv",
    ".tsx" => "typescript (React)",
    ".txt" => "plain text",
    ".vb" => "visual basic",
    ".vbs" => "vbscript",
    ".war" => "web archive",
    ".xml" => "xml",
    ".yaml" => "yaml",
    ".yml" => "yaml"
  }.freeze

  CONFIG_FILE_EXTENSIONS = {
    ".conf" => "configuration file",
    ".ini" => "configuration file",
    ".json" => "json",
    ".lock" => "lock file",
    ".toml" => "toml",
    ".yaml" => "yaml",
    ".yml" => "yaml"
  }.freeze

  TEST_FILE_EXTENSIONS = {
    ".csv" => "csv",
    ".log" => "log file",
    ".md" => "markdown",
    ".txt" => "plain text"
  }.freeze

  COMMON_KNOWN_FILES = {
    ".env" => ".env",
    ".eslintrc" => "eslint configuration",
    ".gitignore" => "gitignore",
    ".prettierrc" => "prettier configuration",
    "Cargo.lock" => "rust lock file",
    "Cargo.toml" => "rust package configuration",
    "Dockerfile" => "Dockerfile",
    "Gemfile" => "ruby dependencies",
    "Gemfile.lock" => "ruby lock file",
    "LICENSE" => "license file",
    "LICENSE.md" => "markdown license file",
    "LICENSE.txt" => "plain text license file",
    "Makefile" => "build script",
    "Pipfile" => "python package configuration",
    "README" => "documentation",
    "README.md" => "documentation",
    "README.txt" => "documentation",
    "build.gradle" => "gradle build script",
    "compose.yml" => "Docker compose file",
    "composer.json" => "php package configuration",
    "composer.lock" => "php lock file",
    "docker-compose.yml" => "Docker compose file",
    "package.json" => "node.js package configuration",
    "pom.xml" => "maven build configuration",
    "requirements.txt" => "python dependencies"
  }.freeze

  UNKNOWN_FILE_TYPE = "unknown"

  def filetype
    COMMON_KNOWN_FILES[basename] || FILE_TYPE_EXTENSIONS[extension] || CONFIG_FILE_EXTENSIONS[extension] || TEST_FILE_EXTENSIONS[extension] || UNKNOWN_FILE_TYPE
  end

  def extension
    File.extname(@filepath)
  end

  def basename
    File.basename(@filepath)
  end
end
