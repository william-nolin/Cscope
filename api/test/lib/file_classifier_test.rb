require "test_helper"

class FileClassifierTest < ActiveSupport::TestCase
  test "#filetype returns the filetype of commonly known extensions" do
    assert_equal("ruby", FileClassifier.new("activejob/lib/active_job/version.rb").filetype)
    assert_equal("javascript", FileClassifier.new("packages/react/src/ReactHooks.js").filetype)
    assert_equal("c", FileClassifier.new("src/btree.c").filetype)
    assert_equal("header file", FileClassifier.new("src/btree.h").filetype)
    assert_equal("c++", FileClassifier.new("router/src/router/src/cluster_metadata.cc").filetype)
    assert_equal("c++", FileClassifier.new("router/src/router/src/cluster_metadata.cpp").filetype)
    assert_equal("python", FileClassifier.new("django/core/paginator.py").filetype)
    assert_equal("rust", FileClassifier.new("src/post.rs").filetype)
    assert_equal("go", FileClassifier.new("src/net/http/responsecontroller.go").filetype)
  end

  test "#extension returns the extension of commonly known extensions" do
    assert_equal(".rb", FileClassifier.new("activejob/lib/active_job/version.rb").extension)
    assert_equal(".js", FileClassifier.new("packages/react/src/ReactHooks.js").extension)
    assert_equal(".c", FileClassifier.new("src/btree.c").extension)
    assert_equal(".h", FileClassifier.new("src/btree.h").extension)
    assert_equal(".cc", FileClassifier.new("router/src/router/src/cluster_metadata.cc").extension)
    assert_equal(".cpp", FileClassifier.new("router/src/router/src/cluster_metadata.cpp").extension)
    assert_equal(".py", FileClassifier.new("django/core/paginator.py").extension)
    assert_equal(".rs", FileClassifier.new("src/post.rs").extension)
    assert_equal(".go", FileClassifier.new("src/net/http/responsecontroller.go").extension)
  end

  test "#filetype returns unknown for unknown filetype" do
    assert_equal("unknown", FileClassifier.new("src/main.xqc").filetype)
  end
end
