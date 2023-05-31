
// API request logic, data processing, and any other server-side functionality
const axios = require('axios');

// Handle POST request for search API

const url = 'https://graphql.anilist.co';
const searchQuery = `
query SearchAnimeName($search: String) {
    Page(page:1) {
        media(search: $search, type: ANIME) {
            title {
                english
            }
        }
    }
}
`;
function searchAnime(searchTerm) {
    const variables = {
        search: searchTerm
    };
    
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
        
}
