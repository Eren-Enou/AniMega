const express = require('express');
const fetchData = require('./public/js/fetchData.js');
const path = require('path');

const app = express();
const port = 3000;

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

// Search function
async function performSearch(searchTerm) {
  try {
    const data = await fetchData(searchTerm);
    return data.data.Page;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching data.');
  }
}

app.get('/js/fetchData.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(path.join(__dirname, 'public', 'js', 'fetchData.js'));
});

// Define routes
// Home route
app.get('/', (req, res) => {
  const searchTerm = req.query.query || ''; // Access the query parameter 'query' from the form
  performSearch(searchTerm)
    .then(searchResults => {
      res.render('home', { search: searchResults });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
