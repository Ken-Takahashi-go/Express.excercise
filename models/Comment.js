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
  }
};
