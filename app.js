// Set express as Node.js web application 
// server framework. 
const express = require('express');
const app = express();

const fetchData = require('./public/js/fetchData');
const searchData = require('./public/js/searchData');

const port = 3000;

// Set EJS as templating engine 
app.set('view engine', 'ejs'); // Set EJS as the view engine

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Define routes
//Home
app.get('/', (req, res) => {
  fetchData
  .then((data) => {
    const media = data.data.Media;DDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDDDDDDDDDDDDDDDDDEA
    res.render('home', { media });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    res.render('error'); // Render an error page or handle the error case appropriately
  })
});

//Search
app.get('/search', (req, res) => {
  const searchQuery = req.query.query;
  searchData
  .then((data) => {
    const media = data.data.Page.media;
    console.log(media);
    res.render('search-results', { query: searchQuery, media: media });
  })
});

//About
app.get('/about', (req, res) => {
  res.send('About page');
});

//Users
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});


app.use(express.static('public'));
  

// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
