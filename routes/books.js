const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// GET  -ALL BOOKS ROUTE - '/' = 'books/'
router.get('/', async (req, res) => {
  res.send('All books');
});

// GET A NEW BOOK ROUTE - 'books/new
router.get('/new', (req, res) => {
  res.send('New book');
});

// POST - CREATE NEW AUTHOR ROUTE - 'books/'
router.post('/', async (req, res) => {
  res.send('Create book');
});
module.exports = router;
