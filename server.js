if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// SET MY ROUTES
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

const app = express();

// CONNECT TO MONGODB DATABASE
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/mybrary', {
// useNewUrlParser: true
// });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to MongoDB'));

// SET MY VIEW ENGINE TO TO EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Every single '.ejs' file will be put into the 'layout.ejs' file template
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// Where I will store css style sheets, images, js files, etc.
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
