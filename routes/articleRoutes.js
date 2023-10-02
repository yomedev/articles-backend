const express = require("express");
const router = express.Router();
const {
  setArticle,
  updateArticle,
  deleteArticle,
  getSingleArticle,
  getArticles,
} = require("../controllers/articleController");

router.route("/").get(getArticles).post(setArticle);

router
  .route("/:id")
  .put(updateArticle)
  .delete(deleteArticle)
  .get(getSingleArticle);

module.exports = router;
