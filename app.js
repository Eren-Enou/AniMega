// Set express as Node.js web application 
// server framework imports
const express = require('express');
const app = express();
const port = 3000;

//API imports
const fetchData = require('./public/js/fetchData');
const searchData = require('./public/js/searchData');



// Set EJS as templating engine 
app.set('views','./views');
app.set('view engine', 'ejs'); // Set EJS as the view engine

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.static('public'));
app.use ('/css', express.static(__dirname + 'public/css'));
app.use ('/js', express.static(__dirname + 'public/js'));
app.use ('/img', express.static(__dirname + 'public/img'));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Define routes
//Home
app.get('/', (req, res) => {
  fetchData
  .then((data) => {
    const media = data.data.Media;
    res.render('home', { media });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    res.render('error', errorMessage=error); // Render an error page or handle the error case appropriately
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



// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
