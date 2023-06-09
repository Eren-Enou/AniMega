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
