// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').parse();
// }

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

const app = express();

// CONNECT TO MONGODB DATABASE
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/mybrary', {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Every single '.ejs' file will be put into the 'layout.ejs' file template
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

// Where I will store css style sheets, images, js files, etc.
app.use(express.static('public'));

// This indexRouter variable will be set to the 'router' variable that is exported
// from the 'index.js' file
app.use('/', indexRouter);

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
