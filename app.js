const express = require('express');
const path = require('path');
const { fetchData, getAiringAnime } = require('./public/js/fetchData.js');
const trendingAnime = require('./public/js/animeRotation.js');

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
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching data.');
  }
}

async function airingAnime() {
  try {
    const data = await getAiringAnime();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching data.');
  }
}
// API endpoint for searching data
app.get('/api/fetchData', (req, res) => {
  const searchTerm = req.query.searchTerm || ''; // Get the search term from the query parameters
  fetchData(searchTerm)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Define routes
// Home route
app.get('/', async (req, res) => {
  const searchTerm = req.query.query || ''; // Access the query parameter 'query' from the form
  try {
    const airingAnimeMedia = await airingAnime();
    const searchResults = await performSearch(searchTerm);
    console.log(airingAnimeMedia);
    res.render('home', { search: searchResults, airingAnime: airingAnimeMedia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
