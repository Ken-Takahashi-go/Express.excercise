const assert = require("power-assert");
const Comment = require("../../models/Comment.js");

describe("Comment.update", () => {
  it("メソッド実行後、引数にidプロパティ値(1以上の整数)を含むオブジェクトが無いとエラーになる", () => {
    const invalidDataList = [
      {},
      { id: 0 },
      { id: -1 },
      { id: null },
      { id: {} },
      { id: [] },
      { id: "1" }
      // { id: 1 }
    ];
    invalidDataList.forEach(data => {
      try {
        Comment.update(data);
        assert.fail();
      } catch (error) {
        assert.equal(error.message, "idは1以上の整数を入力してください");
      }
    });
  });

  it("メソッド実行後、引数にusernameプロパティを含むオブジェクトが無いとエラーになる", () => {
    try {
      Comment.update({ id: 1, body: "詳細" });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "usernameは必須です");
    }
  });

  it("メソッド実行後、引数にbodyプロパティを含むオブジェクトが無いとエラーになる", () => {
    try {
      Comment.update({ id: 1, username: "user" });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "bodyは必須です");
    }
  });
  it("メソッド実行後、引数にbodyプロパティを含むオブジェクトが無いとエラーになる", () => {
    const notExistedId = 99999;
    try {
      Comment.update({ id: notExistedId, username: "user", body: "body" });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "idに該当するcommentが存在しません");
    }
  });
  it("メソッド実行時、正しい引数を渡すと新規にCommentデータ作成される", async () => {
    const data = {
      id: 1,
      username: "user",
      body: "body"
    };
    const updatedComment = Comment.update(data);
    assert.deepEqual(updatedComment, {
      id: data.id,
      username: data.username,
      body: data.body,
      createdAt: updatedComment.createdAt,
      updatedAt: updatedComment.updatedAt
    });

    const currentComments = Comment.findAll();

    assert.deepEqual(currentComments[0], updatedComment);
    assert.equal(updatedComment.createdAt < updatedComment.updatedAt, true);
  });
});
