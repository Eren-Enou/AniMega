//import modules
const express = require('express');
const session = require('express-session');
const router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// Create a PostgreSQL connection pool on local host
// const pool = new Pool({
//   host: '127.0.0.1',
//   user: 'postgres',
//   password: 'password',
//   database: 'animega',
//   port: 5432,
// });

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



// Signup Code POST request to '/signup'. It handles the user signup process, where the client is expected to send a request containing the user's username, email, and password.
router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  //hashes password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred' });
    }

    const user = {
      username: username,
      email: email,
      password: hashedPassword,
      created_date: new Date() // Add the current date and time as the "created_date" field
    };

    pool.connect((err, client, release) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred1' });
      }

      client.query('INSERT INTO users (username, email, password, created_date) VALUES ($1, $2, $3, $4)', [user.username, user.email, user.password, user.created_date], (err, results) => {
        release(); // Release the client back to the pool

        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred2' });
        }
        return res.redirect('/');
      });
    });
  });
});

//POST request to '/signup'. It handles the user signup process, where the client is expected to send a request containing the user's username, email, and password.
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const error = req.query.error;
  
  pool.connect((err, client) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred' });
    }

    //Looks for matching usernames
    client.query('SELECT * FROM users WHERE username = $1', [username], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred' });
      }

      if (results.rows.length === 0) {
        // User not found
        return res.redirect('/login?error=' + encodeURIComponent('Invalid username or password'));
      }

      const user = results.rows[0];

      //compares hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred' });
        }

        if (!isMatch) {
          // Incorrect password
          return res.redirect('/login?error=' + encodeURIComponent('Invalid username or password'));
        }

        // Login successful
        req.session.user = user; // Store the user in the session
        req.session.save((err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred' });
          }
          return res.redirect('/home');
        });
      });
      client.release();
    });
  });
});

//GET requests to '/signup' render the signup page
router.get('/signup', (req, res) => {
  try {
    res.render('signup', { user: '' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

//GET request to '/login' render the login page
router.get('/login', (req, res) => {
  try {
    const errorMessage = req.query.error;
    res.render('login', { user: req.session.user, errorMessage: errorMessage || '' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
