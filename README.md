# SQL-GUI

---

### Live Demo

https://sql-gui.herokuapp.com/

### Code Source

https://github.com/leolopez10/sql-gui

## Description

---

This is a full-stack SQL browser application. The application is made for users to practice looking up data in an SQL format from a preloaded database called chitnook.db from SQLite. Users can also register a username to store their queries. It is a great tool to practice SQL without downloading anything.

### User Story

AS a software developer or data analyst

I want to practice typing SQL code without downloading a new code editor.

SO THAT I can become fluent in SQL

## Getting Started

---

1. Users can type SQL code and hit the RUN button to query a search to our preloaded database. Results will be loaded in a table beneath the code editor.
2. Users can sign up and save queries by registering a username. Click the sign-up link within the banner or the LOGIN button beneath the code editor.
3. Users who are login in can save their queries by typing a TITLE and SQL code into their respective inputs and clicking SAVE. Queries will be stored either above the table on mobile devices or to the left of the editor on desktop devices.
4. Clicking a saved queries will automatically load the query into the code editor ready to run.
5. Users can delete saved queries by clicking the 'X' button in the query.
6. Users can Logout by clicking the LOGOUT button above the user's saved queries
7. Users can delete their account and saved queries from our database by clicking the DELETE ACCOUNT button beneath the code editor.

## Visuals

### Demo of a Logged-In user

![alt text](client/src/assets/img/SQL-GUI.gif 'Demo')

### Landing Page w/o Account

![alt text](client/src/assets/img/mobileLandingPage-noAccount.png 'No Account Landing Page')

### Landing Page

![alt text](client/src/assets/img/mobileLandingPage.png 'Landing Page')

### Results from search

![alt text](client/src/assets/img/mobileResults.png 'Results from search')

## How to Query the data base

---

### Database Diagram

![alt text](client/src/assets/img/sqlite-sample-database.jpg 'Database diagram')

### How to order the more popular statements

1. SELECT
2. FROM
3. JOIN
4. WHERE
5. GROUP BY
6. ORDER BY
7. LIMIT

### Example Queries

1. Select all playlists in the data base.
   - SELECT \*  
     FROM playlists
2. Select album titles and order them alphabetically
   - SELECT albums.Title  
     FROM albums  
     ORDER BY albums.Title
3. Select albums that start with the letter Q
   - SELECT albums.Title  
     FROM albums  
     WHERE albums.Title LIKE 'Q%'  
     ORDER BY albums.Title
4. Select album titles, track names, and artists by joining three tables together
   - SELECT artists.Name, albums.Title, tracks.Name  
     FROM artists  
     JOIN albums ON artists.ArtistId = albums.ArtistId  
     JOIN tracks ON tracks.AlbumId = albums.AlbumId

### Complex Queries Questions w/ answers

---

1.  Which albums have the most tracks?

    - SELECT  
      tracks.AlbumId,  
      albums.Title AS Album,  
      artists.Name AS Artist,  
      COUNT(trackId) AS TrackCount  
      FROM artists  
      JOIN tracks ON tracks.AlbumId = albums.AlbumId  
      JOIN albums ON albums.ArtistId = artists.ArtistId  
      GROUP BY tracks.AlbumId  
      ORDER BY TrackCount DESC

2.  Which albums have the most track time?

    - SELECT  
      tracks.AlbumId,  
      albums.Title AS Album,  
      SUM(milliseconds) / 600000 AS Minutes  
      FROM artists  
      JOIN tracks ON tracks.AlbumId = albums.AlbumId  
      JOIN albums ON albums.ArtistId = artists.ArtistId  
      GROUP BY tracks.AlbumId  
      ORDER BY Minutes DESC

3.  Which artists have the most track time?

    - SELECT  
      artists.ArtistId,  
      artists.Name AS Artist,  
      SUM(milliseconds) / 60000 AS Minutes  
      FROM artists  
      JOIN tracks ON tracks.AlbumId = albums.AlbumId  
      JOIN albums ON albums.ArtistId = artists.ArtistId  
      GROUP BY tracks.AlbumId  
      ORDER BY Minutes DESC

4.  Which tracks appears on the most playlists?

    - SELECT DISTINCT  
      tracks.TrackId,  
      tracks.Name AS Song,  
      COUNT(playlist_track.PlaylistId) AS TrackCount  
      FROM playlists  
      JOIN playlist_track ON playlists.PlaylistId = playlist_track.PlaylistId  
      JOIN tracks ON playlist_track.TrackId = tracks.TrackId  
      GROUP BY tracks.TrackId  
      ORDER BY TrackCount DESC

5.  Which playlists have the most track time?

    - SELECT  
      playlists.PlaylistId,  
      playlists.Name AS PlaylistName,  
      SUM(tracks.Milliseconds) / 60000 AS Minutes  
      FROM playlists  
      JOIN playlist_track ON playlists.PlaylistId = playlist_track.PlaylistId  
      JOIN tracks ON playlist_track.TrackId = tracks.TrackId  
      GROUP BY playlists.PlaylistId  
      ORDER BY Minutes DESC

## Built With

---

Axios - https://www.npmjs.com/package/axios

BootStrap - https://getbootstrap.com/

Express - https://expressjs.com/

MongoDB/Mongoose - https://mongoosejs.com/docs/index.html

Node.js - https://nodejs.org/en/

React - https://reactjs.org/

React Ace - https://www.npmjs.com/package/react-ace

Reactstrap - https://reactstrap.github.io/

Sqlite - https://www.sqlite.org/index.html

### Support

---

#### Email

leo@leo-lopez.com
