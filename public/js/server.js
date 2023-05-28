//API request logic, data processing, and any other server-side functionality
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Handle POST request for search API
app.post('/api/search', (req, res) => {
    const searchQuery = `
    query SearchAnimeName($search: String) {
        Page(page:1, perPage:5) {
            media(search: $search, type: ANIME) {
                title {
                    english
                    native
                }
            }
        }
    }
    `;
    
    const variables = {
        search: req.body.searchTerm
    };
    
    const url = 'https://graphql.anilist.co';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data: {
            query: searchQuery,
            variables: variables
        }
    };
    
    axios(url, options)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                res.json(response.data);
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(error => {
            // Handle errors
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
