/*

This code sets up a server-side application using Express.js for handling API requests related to searching data. It includes a route for fetching data based on a search term using a helper function.

Here's an overview of what this code does:

Import necessary modules, such as Express.
Import helper functions from an external file for searching data.
Create an instance of the Express router.
Define a route for the '/fetchData' API endpoint.
Retrieve the search term from the query parameters.
Call the searchData helper function with the search term.
Handle the returned data by sending it as a JSON response.
Handle potential errors during the search process and provide appropriate responses.
Export the router for use in other parts of the application.
This code aims to provide an API endpoint for searching data based on a given search term.

*/

// searchRoutes.js
const express = require('express');
const router = express.Router();
const { searchData, getAiringAnime, queryMediaID } = require('../public/js/fetchData.js');

// API endpoint for searching data
router.get('/fetchData', (req, res) => {
  const searchTerm = req.query.searchTerm || ''; // Get the search term from the query parameters
  searchData(searchTerm)
    .then((data) => {
      res.json(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

module.exports = router;
