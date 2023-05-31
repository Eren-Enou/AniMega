const axios = require('axios');

async function fetchData(searchTerm) {
  const searchQuery = `
    query SearchAnimeName($search: String) {
      Page(page: 1, perPage: 5) {
        media(search: $search, type: ANIME) {
          title {
            english
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
    return handleResponse(response);
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

module.exports = fetchData;
