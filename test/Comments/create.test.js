const assert = require("power-assert");
const Comment = require("../../models/Comment.js");

describe("Comment.create", () => {
  it("メソッド実行後、引数にusernameプロパティを含むオブジェクトが無いとエラーになる", () => {
    const dataList = [{}, { body: "詳細" }];
    dataList.forEach(data => {
      try {
        Comment.create(data);
        assert.fail();
      } catch (error) {
        assert.equal(error.message, "usernameは必須です");
      }
    });
  });

  it("メソッド実行後、引数にbodyプロパティを含むオブジェクトが無いとエラーになる", () => {
    try {
      Comment.create({ username: "user" });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "bodyは必須です");
    }
  });

  it("メソッド実行時、正しい引数を渡すと新規にCommentデータ作成される", () => {
    const oldComments = Comment.findAll();
    const data = {
      username: "user",
      body: "body"
    };
    const createdComment = Comment.create(data);
    assert.deepEqual(createdComment, {
      id: createdComment.id,
      username: data.username,
      body: data.body,
      createdAt: createdComment.createdAt,
      updatedAt: createdComment.updatedAt
    });
    const currentComments = Comment.findAll();
    assert.equal(oldComments.length + 1, currentComments.length);
  });
});
