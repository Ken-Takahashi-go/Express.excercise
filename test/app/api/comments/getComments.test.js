const request = require("supertest");
const assert = require("power-assert");
const app = require("../../../../app.js");

describe("test [GET /api/commnets]", () => {
  it("return comments o response.body", async () => {
    const response = await request(app)
      .get("/api/comments")
      .set("accept", "application/json")
      .expect("content-Type", /application\/json/)
      .expect(200);

    const comments = response.body;
    // console.log(comments);
    assert.equal(Array.isArray(comments), true);
    comments.forEach(comment => {
      assert.equal(typeof comment.id === "number", true);
      assert.equal(typeof comment.username === "string", true);
      assert.equal(typeof comment.body === "string", true);
      assert.equal(typeof comment.createdAt === "string", true);
      assert.equal(typeof comment.updatedAt === "string", true);
    });
  });
});
