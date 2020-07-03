// NPM packages
require('dotenv').config();
const express = require('express');
const sqlite = require('sqlite3').verbose();
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
let PORT = process.env.PORT || 5000;

// Init Middleware (body parser)
app.use(express.json({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());

// API Routes
app.use(routes);

// ========================================
// Database connections
// ========================================
let sql_db = new sqlite.Database(
  './models/chinook.db',
  sqlite.OPEN_READWRITE,
  err => {
    if (err) {
      return console.log(err.message);
    }
    console.log('Connected to SQlite Database');
  }
);

mongoose
  .connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() =>
    console.log('====================MONGODB CONNECTED====================')
  )
  .catch(error => console.log(error));

// Get user input to come here from the client side
app.post('/api/sql_db', (req, res) => {
  // Hit the database
  let sql = req.body.sql_code;
  // console.log(req.body);
  sql_db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    // console.log(rows);
    res.status(200).json(rows);
  });
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
