const express = require("express");
const router = express.Router();
const controller = require("./../controllers/comments.js");

router.route("/api/").get(controller.getComments);

module.exports = router;
