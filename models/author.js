const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// MONGOOSE WILL CREATE A COLLECTION OF LOWER CASE PLURAL VERSION OF 'Author' --> authors
module.exports = mongoose.model('Author', authorSchema);
