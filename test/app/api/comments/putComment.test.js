const assert = require("power-assert");
const requestHelper = require("../../../helper/requestHelper.js");

const getComments = async () => {
  const response = await requestHelper.request({
    method: "get",
    endPoint: "/api/comments",
    statusCode: 200
  });
  return response.body;
};

const VALID_ID = 1;
const INVALID_ID = 9999;

describe("test [PUT /api/commnets]", () => {
  it("idが不正な場合はエラーになる", async () => {
    const putData = { username: "user", body: "body" };

    const response = await requestHelper
      .request({
        method: "put",
        endPoint: `/api/comments/${INVALID_ID}`,
        statusCode: 400
      })
      .send(putData);
    assert.deepEqual(response.body, {
      message: "idに該当するcommentが存在しません"
    });
  });
  it("usernameを送らなかったら400エラーが出る", async () => {
    const putData = { body: "test body" };

    const response = await requestHelper
      .request({
        method: "put",
        endPoint: `/api/comments/${VALID_ID}`,
        statusCode: 400
      })
      .send(putData);

    assert.deepEqual(response.body, {
      message: "usernameは必須です"
    });
  });
  it("bodyを送らなかったら400エラーが出る", async () => {
    const putData = { username: "user" };

    const response = await requestHelper
      .request({
        method: "put",
        endPoint: `/api/comments/${VALID_ID}`,
        statusCode: 400
      })
      .send(putData);

    assert.deepEqual(response.body, {
      message: "bodyは必須です"
    });
  });
  it("不備なくデータを送ったら成功する", async () => {
    const oldComments = await getComments();

    const putData = {
      username: "test user",
      body: "test body"
    };
    const response = await requestHelper
      .request({
        method: "put",
        endPoint: `/api/comments/${VALID_ID}`,
        statusCode: 200
      })
      .send(putData);

    const updatedComment = response.body;
    assert.deepEqual(updatedComment, {
      id: VALID_ID,
      username: putData.username,
      body: putData.body,
      createdAt: updatedComment.createdAt,
      updatedAt: updatedComment.updatedAt
    });

    const currentComments = await getComments();

    assert.notDeepEqual(
      oldComments,
      currentComments,
      "更新前後でid1のデータは一致しないはず"
    );
  });
});
