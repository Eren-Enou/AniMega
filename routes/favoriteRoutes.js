/*

This code sets up a server-side application using Express.js for managing user favorites in an anime database. It uses a PostgreSQL database and integrates with AniList API for fetching anime data. Here's an overview of what this code does:

Import necessary modules, such as Express and pg.
Create an instance of the Express router.
Create a connection pool to the PostgreSQL database.
Define routes for handling POST, DELETE, and GET requests related to user favorites.
The POST route inserts data into the favorites table by querying the AniList API to fetch the English or Romaji title of the anime. The retrieved data is then inserted into the favorites table using a prepared statement.
The DELETE route removes data from the favorites table based on the specified user ID and anime ID.
The GET route checks if a particular user ID and anime ID combination exists in the favorites table. If a match is found, it returns the existing data; otherwise, it indicates that the combination does not exist.
The code handles potential errors and provides appropriate responses.
Export the router for use in other parts of the application.
This code aims to facilitate the management of user favorites in an anime application, including adding, deleting, and checking the existence of favorites.

*/

// Import modules
const express = require('express');
const { Pool } = require('pg');

// Create instance of express router
const router = express.Router();

// Create pool of PostgreSQL db connection
const pool = new Pool({
  host: 'animega-0.cir5liljprsp.us-west-1.rds.amazonaws.com',
  user: 'postgres',
  password: 'password',
  database: 'animega',
  port: 5432,
});

// POST request to insert data into favorites table
router.post('/favorites/:userId/:animeId', (req, res) => {
  const { userId, animeId } = req.params;

  // GraphQL query variables
  const variables = {
    id: parseInt(animeId), // Convert animeId to an integer if necessary
  };

  // GraphQL query
  const query = `
    query FindAnimeName($id: Int) {
      Page(page: 1) {
        media(id: $id, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            english
            romaji
          }
        }
      }
    }
  `;

  // GraphQL request to AniList
  fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const animeTitle = data.data.Page.media[0].title.english || data.data.Page.media[0].title.romaji;

      // Insert query with the anime's English name
      pool.query(
        'INSERT INTO favorites (userid, animeid, animename) VALUES ($1, $2, $3)',
        [userId, animeId, animeTitle],
        (err, result) => {
          if (err) {
            console.error('Error inserting data into favorites table: ' + err.stack);
            res.status(500).json({ error: 'An error occurred' });
          } else {
            console.log('Favorited successfully!');
            res.status(200).json({ message: 'Data inserted successfully' });
          }
        }
      );
    })
    .catch((error) => {
      console.error('Error querying AniList:', error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

  

// DELETE request to remove data from favorites table
router.delete('/favorites/:userId/:animeId', (req, res) => {
    const { userId, animeId } = req.params;
  
    //Delete query
    pool.query('DELETE FROM favorites WHERE userid = $1 AND animeid = $2', [userId, animeId], (err, result) => {
      if (err) {
        console.error('Error deleting data from favorites table: ' + err.stack);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        console.log('Deleted successfully!');
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });
  

// GET request to check if data exists in favorites table
router.get('/favorites/:userId/:animeId', (req, res) => {
    const { userId, animeId } = req.params;
  
    // Example query: SELECT * FROM favorites WHERE user_id = $1 AND anime_id = $2
    pool.query('SELECT * FROM favorites WHERE userid = $1 AND animeid = $2', [userId, animeId], (err, result) => {
      if (err) {
        console.error('Error querying favorites table: ' + err.stack);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        if (result.rows.length > 0) {
          res.status(200).json({ exists: true, data: result.rows[0] });
        } else {
          res.status(200).json({ exists: false });
        }
      }
    });
  });
  

module.exports = router;
