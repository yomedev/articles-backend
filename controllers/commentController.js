const asyncHanlder = require('express-async-handler')
const Comment = require('../models/commentModel')

// @desc Get comments
// @route GET /api/comments/:id
// @access Public
const getCommentsByArticleId = asyncHanlder(async (req, res) => {
  const comments = await Comment.find({articleId: req.params.id})
  res.status(200).json(comments)
})

// @desc Set comment
// @route POST /api/comments
// @access Private
const setComment = asyncHanlder(async (req, res) => {
  if (!req.body.content || !req.body.author) {
    res.status(400)
    throw new Error('Please provide all fields')
  }

  const newComment = {
    author: req.body.author,
    articleId: req.body.articleId,
    content: req.body.content,
   }

  const comment = await Comment.create(newComment)
  res.status(200).json(comment)
})



// @desc Delete comment
// @route DELETE /api/comments/:id
// @access Private
const deleteComment = asyncHanlder(async (req, res) => {
  const comment = await Comment.findById(req.params.id)

  if (!comment) {
    res.status(400)
    throw new Error('Comment not found')
  }

  await Comment.findByIdAndRemove(req.params.id)
  
  res.status(200).json({id: req.params.id})
})

module.exports = {
  getCommentsByArticleId,
  setComment,
  deleteComment,
}