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

// Lets check if our backend is running (remove this for deployment)
// app.get('/', (req, res) => res.send('API RUNNING!!!'));

app.get('/api/sql_db', (req, res) => {
  // Get all
  sql_db.all(
    `SELECT DISTINCT Name name FROM playlists ORDER BY name`,
    [],
    (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach(row => {
        console.log(row.name);
      });
    }
  );
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
