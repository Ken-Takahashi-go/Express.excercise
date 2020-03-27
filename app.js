const express = require("express");
const commentsRouter = require("./routers/comments.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/comments", commentsRouter);

module.exports = app;
