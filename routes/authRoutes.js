/*

This code sets up a server-side application using Express.js for user authentication and signup functionality. It utilizes PostgreSQL as the database and bcrypt for password hashing. Here's an overview of what this code does:

Import necessary modules, such as Express, session, and pg.
Define a connection pool to the PostgreSQL database, either locally or on AWS RDS.
Establish a connection to the database.
Define a route for user signup, which checks if the username or email already exists in the database, hashes the password, and inserts the user information into the "users" table.
Define a route for user login, which verifies the username, compares the hashed password, and stores the user in the session upon successful login.
Define routes for rendering the signup and login pages, along with handling any error messages.
Export the router for use in other parts of the application.
This code aims to provide a secure user authentication and signup system for an application.

*/

//import modules
const express = require('express');
const session = require('express-session');
const router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const sessionUtils = require('../public/js/sessionUtils');

// Create a PostgreSQL connection pool on local host
const pool = new Pool({
  host: '127.0.0.1',
  user: 'postgres',
  password: 'password',
  database: 'animega',
  port: 5432,
});

// Create a PostgreSQL connection pool connected to AWS RDS NEED TO CREATE NEW 
// const pool = new Pool({
//   host: 'animega-0.cir5liljprsp.us-west-1.rds.amazonaws.com', // Replace with your RDS endpoint
//   user: 'postgres', // Replace with your RDS username
//   password: 'password', // Replace with your RDS password
//   database: 'animega',
//   port: 5432,
// });


// Connect to the database
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database authRoutes');
});



router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const error = req.query.error;

  // Check if username or email already exists in the database
  pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred' });
    }

    // If a user with the same username or email exists, return an error
    if (result.rows.length > 0) {
      return res.redirect('/signup?error=' + encodeURIComponent('Invalid username or email'));
    }

    // Hashes the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred' });
      }

      const user = {
        username: username,
        email: email,
        password: hashedPassword,
        created_date: new Date()
      };

      pool.query('INSERT INTO users (username, email, password, created_date) VALUES ($1, $2, $3, $4)', [user.username, user.email, user.password, user.created_date], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred' });
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
    const errorMessage = req.query.error;
    res.render('signup', { user: '', errorMessage: errorMessage || '' });
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
