// app.js
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY || 'MySuperSecretKey123!@#';
const app = express();
const port = process.env.PORT || 80;

// Set EJS as the templating engine
app.set('views', 'views');
app.set('view engine', 'ejs');

// Middleware setup
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: secretKey, // Add a secret key to sign the session ID cookie
  resave: false, // Disable session resaving on each request
  saveUninitialized: false // Do not save uninitialized sessions
}));

// Import the route files
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes');

// Use the route files
app.use('/api', searchRoutes);
app.use('/', indexRoutes);
app.use('/', authRoutes); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
