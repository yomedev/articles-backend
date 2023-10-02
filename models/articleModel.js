const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please add a content value']
  },
  title: {
    type: String,
    required: [true, 'Please add a title value']
  },
  author: {
    type: String,
    required: [true, 'Please add a author value']
  },
  urlToImage: {
    type: String,
    required: [true, 'Please add an image url value']
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', articleSchema)