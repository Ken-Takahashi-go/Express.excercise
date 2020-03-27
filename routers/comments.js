const express = require("express");
const router = express.Router();
const controller = require("./../controllers/comments.js");

router
  .route("/")
  .get(controller.getComments)
  .post(controller.postComment);

module.exports = router;
