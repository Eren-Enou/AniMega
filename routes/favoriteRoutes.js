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
router.post('/favorites', (req, res) => {
    const { userId, animeId } = req.body;
  
    //Insert query
    pool.query('INSERT INTO favorites (user_id, anime_id) VALUES ($1, $2)', [userId, animeId], (err, result) => {
      if (err) {
        console.error('Error inserting data into favorites table: ' + err.stack);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        console.log('Favorited successfully!');
        res.status(200).json({ message: 'Data inserted successfully' });
      }
    });
  });
  

// DELETE request to remove data from favorites table
router.delete('/favorites/:userId/:animeId', (req, res) => {
    const { userId, animeId } = req.params;
  
    //Delete query
    pool.query('DELETE FROM favorites WHERE user_id = $1 AND anime_id = $2', [userId, animeId], (err, result) => {
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
    pool.query('SELECT * FROM favorites WHERE user_id = $1 AND anime_id = $2', [userId, animeId], (err, result) => {
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
