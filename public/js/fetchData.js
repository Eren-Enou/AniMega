const axios = require('axios');

async function fetchData(searchTerm) {
  const searchQuery = `
    query SearchAnimeName($search: String) {
      Page(page: 1, perPage: 5) {
        media(search: $search, type: ANIME, sort:POPULARITY_DESC) {
          title {
            english
            romaji
          }
        }
      }
    }
  `;
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

  try {
    const response = await axios('https://graphql.anilist.co', options);
    const data = handleResponse(response);
    return data.data.Page.media;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching data.');
  }
}

async function getAiringAnime() {
  const airingQuery = `
  query airingAnime {
    Page(page: 1, perPage: 100) {
      media(
        status: RELEASING
        type: ANIME
        sort: TRENDING_DESC
        season: SPRING
        seasonYear: 2023
        isAdult: false
        format:TV
      ) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
          medium
        }
        trailer {
          id
          site
          thumbnail
        }
      }
    }
  }
  `;
  const variables = {
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    data: {
      query: airingQuery,
      variables: variables
    }
  };

  try {
    const response = await axios('https://graphql.anilist.co', options);
    const data = handleResponse(response);
    return data.data.Page.media;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching data.');
  }
}

function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
}

module.exports = {
  fetchData,
  getAiringAnime
};
