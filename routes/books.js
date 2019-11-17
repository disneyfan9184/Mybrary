const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
const router = express.Router();
const Book = require('../models/book');
// const uploadPath = path.join('public', Book.coverImageBasePath);
const Author = require('../models/author');
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, uploadPath);
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const upload = multer({
//   storage: storage,
//   // dest: uploadPath,
//   fileFilter: (req, file, callback) => {
//     callback(null, imageMimeTypes.includes(file.mimetype));
//   }
// });

// GET - ALL BOOKS ROUTE - '/' = 'books/'
router.get('/', async (req, res) => {
  // res.send('All books');
  let query = Book.find();

  // Search on Title
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'));
  }

  // Search on Publish Before
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishDate', req.query.publishedBefore);
  }

  // Search on Publish After
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('publishDate', req.query.publishedAfter);
  }

  try {
    const books = await query.exec();
    res.render('books/index', {
      books: books,
      searchOptions: req.query
    });
  } catch {
    res.redirect('/');
  }
});

// GET A NEW BOOK ROUTE - 'books/new
router.get('/new', async (req, res) => {
  // res.send('New book');
  renderNewPage(res, new Book());
});

// POST - CREATE NEW BOOK ROUTE - 'books/'
// router.post('/', upload.single('cover'), async (req, res) =>
router.post('/', async (req, res) => {
  // res.send('Create book');

  // const fileName = req.file != null ? req.file.filename : null;

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    // coverImage: fileName,
    description: req.body.description
  });

  saveCover(book, req.body.cover);

  try {
    const newBook = await book.save();
    res.redirect(`books/${newBook.id}`);
    // res.redirect(`books`);
  } catch {
    // if (book.coverImage != null) {
    //   removeBookCover(book.coverImage);
    // }
    renderNewPage(res, book, true);
  }
});

// Show book route
router.get('/:id', async (req, res) => {
  try {
    // This will populate the 'author' object variable within the book object we find.
    // That is what the 'populate()' method does
    const book = await Book.findById(req.params.id)
      .populate('author')
      .exec();
    res.render('books/show', { book: book });
  } catch (error) {
    res.redirect('/');
  }
});

// Edit book route
router.get('/:id/edit', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    renderEditPage(res, book, true);
  } catch (error) {
    res.redirect('/');
  }
});

// Update Book Route
router.put('/:id', async (req, res) => {
  let book;

  try {
    book = await Book.findById(req.params.id);
    book.title = req.body.title;
    book.author = req.body.author;
    book.publishDate = new Date(req.body.publishDate);
    book.pageCount = req.body.pageCount;
    book.description = req.body.description;
    if (req.body.cover != null && req.body.cover != '') {
      saveCover(book, req.body.cover);
    }
    await book.save();
    res.redirect(`/books/${book.id}`);
  } catch {
    if (book != null) {
      renderEditPage(res, book, true);
    } else {
      redirect('/');
    }
  }
});

// Delete Book Route
router.delete('/:id', async (req, res) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    await book.remove();
    res.redirect('/books');
  } catch (error) {
    console.log(error);
    if (book != null) {
      res.render('books/show', {
        book: book,
        errorMessage: 'Could not remove book'
      });
    } else {
      res.redirect('/');
    }
  }
});

// function removeBookCover(fileName) {
//   fs.unlink(path.join(uploadPath, fileName), err => {
//     if (err) {
//       console.log(err);
//     }
//   });
// }

async function renderNewPage(res, book, hasError = false) {
  renderFormPage(res, book, 'new', hasError);
}

async function renderEditPage(res, book, hasError = false) {
  renderFormPage(res, book, 'edit', hasError);
}

async function renderFormPage(res, book, form, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = {
      authors: authors,
      book: book
    };
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating Book';
      } else {
        params.errorMessage = 'Error Creating Book';
      }
    }

    res.render(`books/${form}`, params);
  } catch {
    res.redirect('/books');
  }
}

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64');
    book.coverImageType = cover.type;
  }
}

module.exports = router;
