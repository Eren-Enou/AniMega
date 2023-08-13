/*

This code sets up a server-side application using Express.js for handling API requests related to user anime information and favorites. It utilizes PostgreSQL as the database and includes routes for retrieving user anime information, user information, and favorited anime.

Here's an overview of what this code does:

Import necessary modules, such as Express, session, and pg.
Import session utility functions from an external file.
Create a connection pool to the PostgreSQL database connected to AWS RDS.
Connect to the database.
Define a new route to handle an API request for retrieving user anime information based on the anime ID.
Retrieve the user ID from the session and the anime ID from the URL parameters.
Return the user ID and anime ID as JSON.
Define a route for retrieving user information.
Retrieve the user ID from the session.
Return the user ID as JSON.
Define a route for retrieving favorited anime.
Retrieve the user ID from the query parameters.
Prepare and execute an SQL query to fetch favorited anime based on the user ID.
Handle the query result by transforming it into the desired JSON format and returning it.
Handle potential errors during database queries and provide appropriate responses.
Export the router for use in other parts of the application.
This code aims to provide an API interface for retrieving user anime information, user information, and favorited anime from the PostgreSQL database.

*/

//import modules
const express = require('express');
const session = require('express-session');
const router = express.Router();
const { Pool } = require('pg');

const sessionUtils = require('../public/js/sessionUtils');

// Create a PostgreSQL connection pool connected to AWS RDS
// const pool = new Pool({
//   host: 'animega-0.cir5liljprsp.us-west-1.rds.amazonaws.com', // Replace with your RDS endpoint
//   user: 'postgres', // Replace with your RDS username
//   password: 'password', // Replace with your RDS password
//   database: 'animega',
//   port: 5432,
// });

// Create a PostgreSQL connection pool on local host
const pool = new Pool({
  host: '127.0.0.1',
  user: 'postgres',
  password: 'password',
  database: 'animega',
  port: 5432,
});

// Connect to the database
pool.connect((err, client, release) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }
    console.log('Connected to the database userInfoRoutes');
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