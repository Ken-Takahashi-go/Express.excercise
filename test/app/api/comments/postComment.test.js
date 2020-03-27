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

describe("test [POST /api/commnets]", () => {
  it("usernameを送らなかったら400エラーが出る", async () => {
    const postData = { body: "body" };

    const response = await requestHelper
      .request({
        method: "post",
        endPoint: "/api/comments",
        statusCode: 400
      })
      .send(postData);

    assert.deepEqual(response.body, {
      message: "usernameは必須です"
    });
  });
  it("bodyを送らなかったら400エラーが出る", async () => {
    const postData = { username: "user" };

    const response = await requestHelper
      .request({
        method: "post",
        endPoint: "/api/comments",
        statusCode: 400
      })
      .send(postData);

    assert.deepEqual(response.body, {
      message: "bodyは必須です"
    });
  });
  it("title,bodyを送ったら成功する", async () => {
    const oldComments = await getComments();

    const postData = {
      username: "user",
      body: "body"
    };
    const response = await requestHelper
      .request({
        method: "post",
        endPoint: "/api/comments",
        statusCode: 200
      })
      .send(postData);

    const createdComment = response.body;
    assert.deepEqual(createdComment, {
      id: createdComment.id,
      username: postData.username,
      body: postData.body,
      createdAt: createdComment.createdAt,
      updatedAt: createdComment.updatedAt
    });

    const currentComments = await getComments();

    assert.equal(oldComments.length + 1, currentComments.length);
  });
});
