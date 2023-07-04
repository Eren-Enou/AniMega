//import modules
const express = require('express');
const { Pool } = require('pg');
//create instance of express router
const router = express.Router();

//create pool of PostgreSQL db connection
const pool = new Pool({
    host: 'animega-0.cir5liljprsp.us-west-1.rds.amazonaws.com', 
    user: 'postgres', 
    password: 'password', 
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
router.post('/favorites', (req, res) => {
  const { userId, animeId } = req.body; // sending the userId and animeId in the request body

  // SQL query to insert data into the 'favorites' table
  const insertQuery = 'INSERT INTO favorites (userid, animeid) VALUES ($1, $2)';

  // Execute the query using the connection pool
  pool.query(insertQuery, [userId, animeId], (err, result) => {
    if (err) {
      console.error('Error inserting data into favorites table: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    console.log('Anime added to favorites successfully');
    res.status(201).json({ message: 'Anime added to favorites' });
  });
});


// Export the router
module.exports = router;
