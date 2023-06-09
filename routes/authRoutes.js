// // authRoutes.js
// const express = require('express');
// const router = express.Router();
// const { MongoClient } = require('mongodb');

// const url = 'mongodb://localhost:27017'; // MongoDB connection URL
// const dbName = 'myDatabase'; // Name of your database

// MongoClient.connect(
//   url,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err, client) => {
//     if (err) {
//       console.error('Error connecting to the database', err);
//       return;
//     }
//     console.log('Connected to the database');
//     const db = client.db(dbName);
//     // Additional setup goes here
//   }
// );

// router.post('/signup', (req, res) => {
//   const user = {
//     email: req.body.email,
//     password: req.body.password,
//   };
//   // Save the user to the database
//   db.collection('users').insertOne(user, (err, result) => {
//     if (err) {
//       console.error('Error saving user to database', err);
//       res.status(500).send('Error signing up');
//     } else {
//       res.send('Signup successful');
//     }
//   });
// });

// router.post('/login', (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   // Check if the user exists in the database
//   db.collection('users').findOne({ email, password }, (err, user) => {
//     if (err) {
//       console.error('Error finding user in database', err);
//       res.status(500).send('Error logging in');
//     } else if (!user) {
//       res.status(401).send('Invalid email or password');
//     } else {
//       res.send('Login successful');
//     }
//   });
// });

// module.exports = router;
