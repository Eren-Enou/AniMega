/*

This code sets up a server-side application using Express.js for a web server. It includes routes and helper functions for performing searches, retrieving airing anime data, and fetching media information based on a media ID. The code utilizes cheerio for parsing and manipulating HTML.

Here's an overview of what this code does:

Import necessary modules, such as Express and cheerio.
Create an instance of the Express router.
Import helper functions and middleware from external files.
Set the middleware to be applied to relevant routes.
Define helper functions for performing searches, retrieving airing anime data, and fetching media information.
Create a helper function to convert HTML to readable text using cheerio.
Define routes for the home page, user profile page, and media page.
Handle the home route, which fetches search results and airing anime data, and renders the home page template with the search results, airing anime data, and user information.
Handle the user profile route, which checks if the user is logged in and renders the profile page template with the user object.
Handle the media page route, which fetches media information based on the media ID, modifies the description, and renders the bio-page template with the modified media data and user information.
Define a redirect route from '/' to '/home'.
Define a requireAuthentication middleware function to check if a user is authenticated and allow access to authenticated routes.
Export the router for use in other parts of the application.
This code aims to provide functionality for searching anime, displaying airing anime, rendering user profiles, and retrieving media information based on the media ID.

*/

// import modules
const express = require('express'); //creating web server
const cheerio = require('cheerio'); //parsing/manipulating html


const router = express.Router();
const { searchData, getAiringAnime, queryMediaID } = require('../public/js/fetchData.js');
const sessionUtils = require('../public/js/sessionUtils');
const setUserMiddleware = require('../middleware/setUser.js');


//Set middleware
router.use(setUserMiddleware);

// Apply the middleware to relevant routes
router.use(['/home', '/user', '/media/:id'], setUserMiddleware);



// Helper search term function 
async function performSearch(searchTerm) {
  try {
    const data = await searchData(searchTerm);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching search data.');
  }
}

//Helper search airing anime function
async function airingAnime() {
  try {
    const data = await getAiringAnime();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching airing data.');
  }
}

//Helper search media ID function
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
    console.log(req.user);

    //render home with Search, AiringAnime, User passed in
    res.render('home', { search: searchResults, airingAnime: airingAnimeMedia, user: req.user }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred with user' });
  }
});

//User Route
router.get('/user/', async  (req, res) => {
  const user = sessionUtils.getUserFromSession(req);
  if (user) {
    // User is logged in
    // Render the profile page and pass the user object to the template
    res.render('user', { user: user });
  } else {
    // User is not logged in
    res.redirect('/login');
  }
});


// Route to open a new webpage based on mediaID
router.get('/media/:id', async (req, res) => {
  const mediaID = req.params.id;
  try {
    const mediaData = await searchMediaID(mediaID);
    const user = sessionUtils.getUserFromSession(req);
    console.log(mediaData);
    console.log(user);
    const modifiedDescription = extractTextFromHTML(mediaData.description);
    
    // Render the webpage and pass the modified mediaData to the template
    res.render('bio-page', { media: { ...mediaData, description: modifiedDescription }, user: user });
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

function requireAuthentication(req, res, next) {
  if (req.session.user) {
    // User is authenticated
    next();
  } else {
    // User is not authenticated, redirect to login
    res.redirect('/login');
  }
}

// Usage:
router.get('/home', requireAuthentication, (req, res) => {
  // Handle the authenticated route
});


module.exports = router;
