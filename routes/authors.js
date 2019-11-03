const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// GET ALL AUTHORS ROUTE - '/' = 'authors/'
router.get('/', (req, res) => {
  res.render('authors/index');
});

// GET A NEW AUTHOR ROUTE - 'authors/new
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

// CREATE NEW AUTHOR ROUTE - 'authors/'
router.post('/', (req, res) => {
  const author = new Author({
    name: req.body.name
  });
  author.save((err, newAuthor) => {
    if (err) {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating author'
      });
    } else {
      // res.redirect(`authors/${newAuthor.id}`)
      res.redirect(`authors`);
    }
  });
});
module.exports = router;
