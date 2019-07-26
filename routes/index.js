// SET UP ALL OF OUR ROUTES(CONTROLLERS)
const express = require('express');
const router = express.Router();

// SET UP OUR 'GET' FOR THE HOME ROUTE: LOCAL HOST 3000.
router.get('/', (req, res) => {
  // Take the 'index.ejs' file and put it into the 'layouts.ejs' file and display to client browser
  res.render('index');
});

module.exports = router;
