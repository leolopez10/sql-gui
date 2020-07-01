// NPM packages
require('dotenv').config();
const express = require('express');
const sqlite = require('sqlite3').verbose();

// // Establish connection
// let db = new sqlite.Database(
//   './models/chinook.db',
//   sqlite.OPEN_READWRITE,
//   err => {
//     if (err) {
//       return console.log(err.message);
//     }
//     console.log('Connected to SQlite Database');
//   }
// );

// // Basic Querying Data in SQLite Database
// // Get all
// db.all(
//   `SELECT DISTINCT Name name FROM playlists ORDER BY name`,
//   [],
//   (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     rows.forEach(row => {
//       console.log(row.name);
//     });
//   }
// );

// // Get method
// let playListId = 5;
// db.get(
//   `SELECT PlaylistId id, Name name FROM playlists WHERE PlaylistId = ?`,
//   [playListId], // the number related to the playlist
//   (err, row) => {
//     if (err) {
//       return console.log(err.message);
//     }
//     if (row) {
//       console.log(row.id, row.name);
//     } else {
//       console.log(`No playlist found with the id ${playListId}`);
//     }
//   }
// );

// // Each method
// db.each(
//   `SELECT FirstName firstName,
// LastName lastName,
// Email email
// FROM customers
// WHERE Country = ?
// ORDER BY FirstName`,
//   ['USA'],
//   (err, row) => {
//     if (err) {
//       throw err;
//     }
//     console.log(`${row.firstName} ${row.lastName} - ${row.email}`);
//   }
// );

// // Controlling the Execution Flow of Statements in SQLite
// // The serialize() method puts the execution mode into serialized mode. It means that only one statement can execute at a time. Other statements will wait in a queue until all the previous statements are executed.
// // db.serialize(() => {
// //   // Queries scheduled here will be serialized.
// //   db.run('CREATE TABLE greetings(message text)')
// //     .run(
// //       `INSERT INTO greetings(message)
// //           VALUES('Hi'),
// //                 ('Hello'),
// //                 ('Welcome')`
// //     )
// //     .each(`SELECT message FROM greetings`, (err, row) => {
// //       if (err) {
// //         throw err;
// //       }
// //       console.log(row.message);
// //     });
// // });

// // If you want the scheduled queries to execute in parallel, you place them in the parallelize() method. Order of execution is not the same like serialize is.
// db.parallelize(() => {
//   dbSum(1, 1, db);
//   dbSum(2, 2, db);
//   dbSum(3, 3, db);
//   dbSum(4, 4, db);
//   dbSum(5, 5, db);
// });

// function dbSum(a, b, db) {
//   db.get('SELECT (? + ?) sum', [a, b], (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(`The sum of ${a} and ${b} is ${row.sum}`);
//   });
// }

// // Close connection
// db.close(err => {
//   if (err) {
//     return console.log(err.message);
//   }
//   console.log('Closed the database connection');
// });

// ================================================================
// Sample Database
// ================================================================
// let db = new sqlite.Database('./models/sample.db');

// // db.run('CREATE TABLE langs(name text)');

// // insert one row into the langs table
// db.run(`INSERT INTO langs(name) VALUES(?)`, ['C'], function (err) {
//   if (err) {
//     return console.log(err.message);
//   }
//   // get the last insert id
//   console.log(`A row has been inserted with rowid ${this.lastID}`);
// });

// // construct the insert statement with multiple placeholders
// // based on the number of rows
// let languages = ['C++', 'Python', 'Java', 'C#', 'Go'];
// let placeholders = languages.map(language => '(?)').join(',');
// let sql = 'INSERT INTO langs(name) VALUES ' + placeholders;

// // output the INSERT statement
// console.log(sql);

// db.run(sql, languages, function (err) {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log(`Rows inserted ${this.changes}`);
// });

// db.close();
