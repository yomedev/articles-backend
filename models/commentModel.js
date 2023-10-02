const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Article'
  },
  content: {
    type: String,
    required: [true, 'Please add a content value']
  },
  author: {
    type: String,
    required: [true, 'Please add a author value']
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)