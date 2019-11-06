const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImage: {
    type: String,
    required: true
  },
  author: {
    // Telling me to reference another object inside of our collections
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }
});

// MONGOOSE WILL CREATE A COLLECTION OF LOWER CASE PLURAL VERSION OF 'Book' --> books
module.exports = mongoose.model('Book', bookSchema);
