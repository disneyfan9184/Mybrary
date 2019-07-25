// SET UP ALL OF OUR ROUTES(CONTROLLERS)
const express = require('express');
const router = express.Router();

// SET UP OUR GET TO THE HOME ROUTE
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
