const axios = require('axios');

var page = {};
var media = {};

var mediaQuery = `
query ($search: String, $status: MediaStatus) {
    Media(search: $search, type: ANIME, status: $status) {
        genre
        search
        title {
            english
            native
        }
        status
        description
        trailer
        coverImage
        genres
        synonyms
        averageScore
        popularity
        trending
        favourites
        tags
        relations
        externalLinks
        streamingEpisodes
        rankings
    }
}
  
`;

// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

// Define our query variables and values that will be used in the query request
var variables = {
    id: 15125
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data: {
            query: query,
            variables: variables
          }
    };

// Make the HTTP Api request
function fetchData() {
    return axios(url, options)
      .then(handleResponse);
  }

  function handleResponse(response) {
    if (response.status >= 200 && response.status < 300) {
        console.log(response.data)
        return response.data;
    } else {
        throw new Error(response.statusText);
    }
  }


module.exports = fetchData();