// NPM packages
require('dotenv').config();
const express = require('express');
const sqlite = require('sqlite3').verbose();

// Establish connection
let db = new sqlite.Database(
  './models/chinook.db',
  sqlite.OPEN_READWRITE,
  err => {
    if (err) {
      return console.log(err.message);
    }
    console.log('Connected to SQlite Database');
  }
);

// Close connection
db.close(err => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Closed the database connection');
});
