const express = require('express');
const path = require('path');
const ejs = require('ejs');


const { searchData, getAiringAnime, queryMediaID } = require('./public/js/fetchData.js');

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
    const data = await searchData(searchTerm);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching search data.');
  }
}

async function airingAnime() {
  try {
    const data = await getAiringAnime();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching airing data.');
  }
}

async function searchMediaID(mediaID) {
  try {
    const data = await queryMediaID(mediaID);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching media ID data.');
  }
}
// API endpoint for searching data
app.get('/api/fetchData', (req, res) => {
  const searchTerm = req.query.searchTerm || ''; // Get the search term from the query parameters
  searchData(searchTerm)
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
app.get('/home', async (req, res) => {
  const searchTerm = req.query.query || ''; // Access the query parameter 'query' from the form
  try {
    const airingAnimeMedia = await airingAnime();
    const searchResults = await performSearch(searchTerm);

    res.render('home', { search: searchResults, airingAnime: airingAnimeMedia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Route to open a new webpage based on mediaID
app.get('/media/:id', async (req, res) => {
  const mediaID = req.params.id;
  try {
    const mediaData = await searchMediaID(mediaID);
    console.log(mediaData);
    const modifiedDescription = mediaData.description.replace(/<br>/g, '\n').replace(/<\/?i>/g, '');
    // Render the webpage and pass the modified mediaData to the template
    res.render('bio-page', { media: { ...mediaData, description: modifiedDescription } });
  } catch(error) {
    if (error.response) {
      // Access the response object in the error
      console.log(error.response);
    } else {
      // Handle other types of errors
      console.log('Error:', error.message);
    }
}});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
