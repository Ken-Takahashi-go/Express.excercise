const comments = [];
let nextId = 1;

class Comment {
  constructor({ username, body }) {
    this.id = nextId++;
    this.username = username;
    this.body = body;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

for (let i = 0; i < 5; i++) {
  const index = i + 1;
  const comment = new Comment({
    username: "name" + index,
    body: "詳細" + index
  });
  comments.push(comment);
}

module.exports = {
  findAll: () => {
    return comments.slice();
  },
  create: ({ username, body }) => {
    if (!username) {
      throw new Error("usernameは必須です");
    }
    if (!body) {
      throw new Error("bodyは必須です");
    }
    const comment = new Comment({
      username,
      body
    });
    comments.push(comment);
    return comment;
  },
  update: ({ id, username, body }) => {
    if (typeof id !== "number" || id < 1) {
      throw new Error("idは1以上の整数を入力してください");
    }
    if (!username) {
      throw new Error("usernameは必須です");
    }
    if (!body) {
      throw new Error("bodyは必須です");
    }
    const comment = comments.find(comment => id === comment.id);
    if (!comment) {
      throw new Error("idに該当するcommentが存在しません");
    }

    comment.username = username;
    comment.body = body;
    comment.updatedAt = new Date();
    return comment;
  }
};
