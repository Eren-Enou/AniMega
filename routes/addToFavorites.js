//UNUSED FILE
/*
First attempt at adding to favorites, 
connect to express.router and PostgreSQL pool,
POST request to favorites api
SQL query to select all from favorites where user id and anime id match variables from req.body
check if: rows.length is greater than 0 = the combination already exists in favorites,
else, insert query with user id and anime id into favorites table.
*/

//import modules
const express = require('express');
const { Pool } = require('pg');
//create instance of express router
const router = express.Router();

//create pool of PostgreSQL db connection
// const pool = new Pool({
//     host: 'animega-0.cir5liljprsp.us-west-1.rds.amazonaws.com', 
//     user: 'postgres', 
//     password: 'password', 
//     database: 'animega',
//     port: 5432,
//   });

const pool = new Pool({
  host: 'localhost',
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
console.log('Connected to the database addToFavorites');
});

// POST request that attempts to insert the provided 'userId' and 'animeId' into the 'favorites' table in the PostgreSQL database using the connection pool.
router.post('/favorites', (req, res) => {
  const { userId, animeId } = req.body; // sending the userId and animeId in the request body

  // SQL query to check if the anime/user combination already exists in the 'favorites' table
  const checkQuery = 'SELECT * FROM favorites WHERE userid = $1 AND animeid = $2';

  // Execute the query using the connection pool
  pool.query(checkQuery, [userId, animeId], (err, result) => {
    if (err) {
      console.error('Error querying favorites table: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (result.rows.length > 0) {
      // Anime/user combination already exists in the table
      console.log('Anime/user combination already exists in favorites');
      res.status(409).json({ error: 'Anime/user combination already exists in favorites' });
    } else {
      // Anime/user combination doesn't exist, proceed to insert
      // SQL query to insert data into the 'favorites' table
      const insertQuery = 'INSERT INTO favorites (userid, animeid) VALUES ($1, $2)';

      // Execute the query to insert the data
      pool.query(insertQuery, [userId, animeId], (err, result) => {
        if (err) {
          console.error('Error inserting data into favorites table: ' + err.stack);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        console.log('Anime added to favorites successfully');
        res.status(201).json({ message: 'Anime added to favorites' });
      });
    }
  });
});


// Export the router
module.exports = router;
