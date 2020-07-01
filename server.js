// NPM packages
require('dotenv').config();
const express = require('express');
const sqlite = require('sqlite3').verbose();

const app = express();
let PORT = process.env.PORT || 5000;

// Init Middleware (body parser)
app.use(express.json({ extended: false }));

// Lets check if our backend is running (remove this for deployment)
app.get('/', (req, res) => res.send('API RUNNING!!!'));

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));

// // ========================================
// // Database connections
// // ========================================
// // Establish SQLite connection
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

// // Close SQLite connection
// db.close(err => {
//   if (err) {
//     return console.log(err.message);
//   }
//   console.log('Closed the database connection');
// });
