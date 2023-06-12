// indexRoutes.js
const express = require('express');
const cheerio = require('cheerio');

const router = express.Router();
const { searchData, getAiringAnime, queryMediaID } = require('../public/js/fetchData.js');

// Custom middleware to set the user property in req.session
const setUserMiddleware = (req, res, next) => {
  req.user = req.session.user || null; // Set user to null if not logged in
  next();
};

// Apply the middleware to relevant routes
router.use(['/home', '/user', '/media/:id'], setUserMiddleware);


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
    const description = extractTextFromHTML(data.description);
    data.description = description;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching media ID data.');
  }
}

// Helper function to convert HTML to readable text using cheerio
function extractTextFromHTML(html) {
  const $ = cheerio.load(html);
  return $.text();
}

// Home route
router.get('/home', async (req, res) => {
  const searchTerm = req.query.query || '';
  try {
    const airingAnimeMedia = await airingAnime();
    const searchResults = await performSearch(searchTerm);

    console.log(req.user); // Access the user property from req object

    res.render('home', { search: searchResults, airingAnime: airingAnimeMedia, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred with user' });
  }
});

router.get('/user/', async (req, res) => {
  
  const user = req.user;
  
  // Render the profile page and pass the user object to the template
  res.render('user', { user: user });
});


// Route to open a new webpage based on mediaID
router.get('/media/:id', async (req, res) => {
  const mediaID = req.params.id;
  try {
    const mediaData = await searchMediaID(mediaID);
    
    console.log(mediaData);
    const modifiedDescription = mediaData.description.replace(/<br>/g, '\n').replace(/<\/?i>/g, '');
    // Render the webpage and pass the modified mediaData to the template
    res.render('bio-page', { media: { ...mediaData, description: modifiedDescription }, user: req.user });
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
