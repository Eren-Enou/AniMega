//import modules
const express = require('express');
const session = require('express-session');
const router = express.Router();
const { Pool } = require('pg');

const sessionUtils = require('../public/js/sessionUtils');

// Create a PostgreSQL connection pool connected to AWS RDS
const pool = new Pool({
  host: 'animega-0.cir5liljprsp.us-west-1.rds.amazonaws.com', // Replace with your RDS endpoint
  user: 'postgres', // Replace with your RDS username
  password: 'password', // Replace with your RDS password
  database: 'animega',
  port: 5432,
});

// Connect to the database
pool.connect((err, client, release) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }
    console.log('Connected to the database');
  });

  // Create a new route to handle the API request
router.get('/api/user-anime-info/:animeId', (req, res) => {
    const userId = sessionUtils.getUserFromSession(req).id;
    const animeId = req.params.animeId; // You get the anime ID from the URL parameters
    res.json({ userId, animeId }); // Return the data as JSON
  });
  
router.get('/api/user-info', (req, res) => {
    const userId = sessionUtils.getUserFromSession(req).id;
    res.json({ userId });
})
  
// Define the route for retrieving favorited anime
router.get('/api/favorited-anime', (req, res) => {
    const { userId } = req.query;
  
    // Prepare the SQL query to fetch favorited anime by userId
    const query = {
      text: 'SELECT animeid, animename FROM favorites WHERE userid = $1',
      values: [userId],
    };
  
    // Execute the query and handle the result
    pool.query(query)
      .then((result) => {
        const favoritedAnime = result.rows.map((row) => ({
          animeid: row.animeid,
          animename: row.animename,
        }));
        res.json(favoritedAnime);
      })
      .catch((error) => {
        console.error('Error executing database query:', error);
        res.status(500).json({ error: 'An error occurred while fetching favorited anime.' });
      });
  });
  
  module.exports = router;