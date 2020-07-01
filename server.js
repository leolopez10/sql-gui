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

// Queries
// Get all
db.all(
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

// Get method
let playListId = 5;
db.get(
  `SELECT PlaylistId id, Name name FROM playlists WHERE PlaylistId = ?`,
  [playListId], // the number related to the playlist
  (err, row) => {
    if (err) {
      return console.log(err.message);
    }
    if (row) {
      console.log(row.id, row.name);
    } else {
      console.log(`No playlist found with the id ${playListId}`);
    }
  }
);

// Each method
db.each(
  `SELECT FirstName firstName,
LastName lastName,
Email email
FROM customers
WHERE Country = ?
ORDER BY FirstName`,
  ['USA'],
  (err, row) => {
    if (err) {
      throw err;
    }
    console.log(`${row.firstName} ${row.lastName} - ${row.email}`);
  }
);

// Close connection
db.close(err => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Closed the database connection');
});
