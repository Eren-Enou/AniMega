// indexRoutes.js
const express = require('express');
const router = express.Router();
const { searchData, getAiringAnime, queryMediaID } = require('../public/js/fetchData.js');

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

// Home route
router.get('/home', async (req, res) => {
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
router.get('/media/:id', async (req, res) => {
  const mediaID = req.params.id;
  try {
    const mediaData = await searchMediaID(mediaID);
    console.log(mediaData);
    const modifiedDescription = mediaData.description.replace(/<br>/g, '\n').replace(/<\/?i>/g, '');
    // Render the webpage and pass the modified mediaData to the template
    res.render('bio-page', { media: { ...mediaData, description: modifiedDescription } });
  } catch (error) {
    if (error.response) {
      // Access the response object in the error
      console.log(error.response);
    } else {
      // Handle other types of errors
      console.log('Error:', error.message);
    }
  }
});

// Route for '/' leading to '/home'
router.get('/', (req, res) => {
  res.redirect('/home');
});

module.exports = router;
