const express = require("express");
const router = express.Router();
const {
  getCommentsByArticleId,
  setComment,
  deleteComment,
} = require("../controllers/commentController");

router.route("/").post(setComment);

router.route("/:id").delete(deleteComment).get(getCommentsByArticleId);

module.exports = router;
