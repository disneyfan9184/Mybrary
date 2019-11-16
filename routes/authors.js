const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// GET ALL AUTHORS ROUTE - '/' = 'authors/'
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.name !== null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    });
  } catch {
    res.redirect('/');
  }
});

// GET A NEW AUTHOR ROUTE - 'authors/new
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

// CREATE NEW AUTHOR ROUTE - 'authors/'
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`);
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating author'
    });
  }
});

// GET A SPECIFIC AUTHOR BY ID - 'authors/id'
router.get('/:id', (req, res) => {
  res.send('Show Author ' + req.params.id);
});

// EDIT AUTHOR ROUTE
router.get('/:id/edit', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render('authors/edit', { author: author });
  } catch {
    res.redirect('/authors');
  }
});

// UPDATE AUTHOR ROUTE
router.put('/:id', (req, res) => {
  res.send('Update Author ' + req.params.id);
});

// DELETE AUTHOR ROUTE
router.delete('/:id', (req, res) => {
  res.send('Delete Author ' + req.params.id);
});
module.exports = router;
