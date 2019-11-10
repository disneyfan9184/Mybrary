const mongoose = require('mongoose');
// const path = require('path');
// const coverImageBasePath = 'uploads/bookCovers';

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
    type: Buffer,
    required: true
  },
  coverImageType: {
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

// CREATE A VIRTUAL PROPERTY
bookSchema.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${
      this.coverImageType
    }; charset=utf-8;base64, ${this.coverImage.toString('base64')}`;
  }
});

// MONGOOSE WILL CREATE A COLLECTION OF LOWER CASE PLURAL VERSION OF 'Book' --> books
module.exports = mongoose.model('Book', bookSchema);
// module.exports.coverImageBasePath = coverImageBasePath;
