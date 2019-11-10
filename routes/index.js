// SET UP ALL OF OUR ROUTES(CONTROLLERS)
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// SET UP OUR 'GET' FOR THE HOME ROUTE: LOCAL HOST 3000.
router.get('/', async (req, res) => {
  // Take the 'index.ejs' file and put it into the 'layouts.ejs' file and display to client browser
  let books;
  try {
    books = await Book.find()
      .sort({ createdAt: 'desc' })
      .limit(10)
      .exec();
  } catch {
    books = [];
  }
  res.render('index', { books: books });
});

module.exports = router;
