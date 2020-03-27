const Comment = require("./../models/Comment.js");

module.exports = {
  getComments: (req, res) => {
    const storedComments = Comment.findAll();
    res.status(200).json(storedComments);
  }
};
