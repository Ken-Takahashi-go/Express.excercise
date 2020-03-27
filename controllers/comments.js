const Comment = require("./../models/Comment.js");

module.exports = {
  getComments: (req, res) => {
    const storedComments = Comment.findAll();
    res.status(200).json(storedComments);
  },
  postComment: (req, res) => {
    try {
      const { username, body } = req.body;
      const createdComment = Comment.create({ username, body });
      res.status(200).json(createdComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  putComment: (req, res) => {
    const id = req.params.id;
    const { username, body } = req.body;
    const parseId = parseInt(id, 10);
    try {
      const updatedComment = Comment.update({ id: parseId, username, body });
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};
