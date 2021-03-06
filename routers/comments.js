const express = require("express");
const router = express.Router();
const controller = require("./../controllers/comments.js");

router
  .route("/")
  .get(controller.getComments)
  .post(controller.postComment);

router.route("/:id").put(controller.putComment);

module.exports = router;
