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
