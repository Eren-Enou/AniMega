const express = require('express');
const session = require('express-session');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');



// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'animega',
});


// Connect to the database
pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error connecting to the database: ' + error.stack);
    return;
  }
  console.log('Connected to the database as ID ' + connection.threadId);
});

//Signup Code
router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred' });
    }

    const user = {
      username: username,
      email: email,
      password: hashedPassword,
    };

    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred' });
      }

      connection.query('INSERT INTO users SET ?', user, (err, results) => {
        connection.release(); // Release the connection

        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred' });
        }

        res.status(200).json({ message: 'User registered successfully' });
      });
    });
  });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const error = req.query.error
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred' });
      }
  
      connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        connection.release(); // Release the connection
  
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred' });
        }
  
        if (results.length === 0) {
          // User not found  
          return res.redirect('/login?error=' + encodeURIComponent('Invalid username or password'));
        }
  
        const user = results[0];
  
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
          req.session.user = user;// Store the user in the session
          return req.session.save((err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'An error occurred' });
            }
            return res.redirect('/home');
          });
        });
      });
    });
  });
  
  

router.get('/signup', (req, res) => {
  try {
    res.render('signup', {user:''});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/login', (req, res) => {
    try {
      const errorMessage = req.query.error;
      res.render('login', {user: req.session.user, errorMessage: errorMessage || '' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

// // Close the database connection
// pool.end((error) => {
//   if (error) {
//     console.error('Error closing the connection: ' + error.stack);
//     return;
//   }
//   console.log('Connection closed successfully.');
// });

module.exports = router;
