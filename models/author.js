const mongoose = require('mongoose');
const Book = require('./book');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Mongoose allows us to run a method before we would actually remove/delete an author.
// Need to put in a normal callback with the 'function' keyword so that we can use 'this'
authorSchema.pre('remove', function(next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err);
    } else if (books.length > 0) {
      next(new Error('This author still has books'));
    } else {
      next();
    }
  });
});

// MONGOOSE WILL CREATE A COLLECTION OF LOWER CASE PLURAL VERSION OF 'Author' --> authors
module.exports = mongoose.model('Author', authorSchema);
