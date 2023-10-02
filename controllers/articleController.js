const asyncHanlder = require("express-async-handler");

const Article = require("../models/articleModel");

// @desc Get articles
// @route GET /api/articles
// @access Public
const getArticles = asyncHanlder(async (req, res) => {
  const page = Number(req.query?.page) || 1;
  const search = req.query?.search || "";
  const limit = Number(req.query?.limit) || 9;

  const searchRegex = new RegExp(search, "i");

  const queryCondition = search ? { title: searchRegex } : {};

  let articles = Article.find(queryCondition);

  const amountSkipped = (page - 1) * limit;

  const [total, paginatedArticles] = await Promise.all([
    articles.clone().countDocuments({}),
    articles.skip(amountSkipped).limit(limit),
  ]);

  res.status(200).json({ total, articles: paginatedArticles });
});

// @desc Get single article
// @route POST /api/articles/:id
// @access Public
const getSingleArticle = asyncHanlder(async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.status(200).json(article);
});

// @desc Set article
// @route POST /api/articles
// @access Private
const setArticle = asyncHanlder(async (req, res) => {
  if (!req.body.author || !req.body.title || !req.body.content || !req.body.urlToImage) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  const newArticle = {
    author: req.body.author,
    title: req.body.title,
    urlToImage: req.body.urlToImage,
    content: req.body.content,
  };

  const article = await Article.create(newArticle);
  res.status(200).json(article);
});

// @desc Update article
// @route PUT /api/articles/:id
// @access Private
const updateArticle = asyncHanlder(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.status(400);
    throw new Error("Article not found");
  }

  const updatedArticle = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedArticle);
});

// @desc Delete article
// @route DELETE /api/articles/:id
// @access Private
const deleteArticle = asyncHanlder(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.status(400);
    throw new Error("Article not found");
  }

  await Article.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getArticles,
  setArticle,
  updateArticle,
  deleteArticle,
  getSingleArticle,
};
