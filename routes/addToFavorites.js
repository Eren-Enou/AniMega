//import modules
const express = require('express');
const { Pool } = require('pg');
//create instance of express router
const router = express.Router();

//create pool of PostgreSQL db connection
const pool = new Pool({
    host: 'animega-0.cir5liljprsp.us-west-1.rds.amazonaws.com', // Replace with your RDS endpoint
    user: 'postgres', // Replace with your RDS username
    password: 'password', // Replace with your RDS password
    database: 'animega',
    port: 5432,
  });

//connect to PostgreSQL db
pool.connect((err, client, release) => {
if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
}
console.log('Connected to the database');
});

//POST request that attempts to insert the provided 'userId' and 'animeId' into the 'favorites' table in the PostgreSQL database using the connection pool.
router.post('/add-to-favorites', async (req, res) => {
    try {
      // Retrieve the necessary data from the client-side request
      const { userId, animeId } = req.body; // Assuming you are sending userId and animeId in the request body
  
      // Execute the PostgreSQL query to insert the anime into the user's favorites table
      await pool.none('INSERT INTO favorites (user_id, anime_id) VALUES ($1, $2)', [userId, animeId]);
  
      // Send a success response back to the client-side
      res.status(200).json({ success: true, message: 'Anime added to favorites successfully.' });
    } catch (error) {
      // Handle any errors that occurred during the process
      console.error('Error adding anime to favorites:', error);
      res.status(500).json({ success: false, message: 'An error occurred while adding anime to favorites.' });
    }
  });
  