/*

This code includes functions related to fetching data from the AniList API using GraphQL and Axios. It provides functionality for querying media details based on the media ID, performing a search for anime by name, and getting a list of airing anime.

Here's an overview of what this code does:

Import the required modules, including axios for making HTTP requests.
Define an async function named queryMediaID() to query media details based on the media ID.
Declare a GraphQL query mediaIDQuery to fetch media details.
Define the request options, including the request method, headers, and data.
Make an asynchronous request using axios to the AniList API endpoint, passing the options.
Handle the API response by calling the handleResponse() function.
Log the data for testing purposes.
Return the data.data.Media object from the response.
Define an async function named searchData() to perform a search for anime based on the search term.
Declare a GraphQL query searchQuery to search for anime by name.
Define the request options, including the request method, headers, and data.
Make an asynchronous request using axios to the AniList API endpoint, passing the options.
Handle the API response by calling the handleResponse() function.
Return the data.data.Page.media array from the response.
Define an async function named getAiringAnime() to get a list of airing anime.
Declare a GraphQL query airingQuery to fetch airing anime.
Define the request options, including the request method, headers, and data.
Make an asynchronous request using axios to the AniList API endpoint, passing the options.
Handle the API response by calling the handleResponse() function.
Return the data.data.Page.media array from the response.
Define a function named handleResponse() to handle the response from the API.
Check if the response status is within the success range (200-299).
If successful, return the response data.
If not successful, throw an error with the response status text.
Export the searchData(), getAiringAnime(), and queryMediaID() functions.
This code demonstrates how to fetch data from the AniList API using GraphQL and Axios, providing functions for searching anime, retrieving airing anime, and querying media details based on the media ID.

*/

const axios = require('axios');

// Function to query media details based on the media ID for the bio page
async function queryMediaID(mediaID) {
  // GraphQL query to fetch media details
  const mediaIDQuery = `
  query($id:Int) {
    Media(id: $id) {
      bannerImage
      coverImage{
        medium
        large
      }
      title {
        romaji
        english
        native
      }
      description (asHtml:true)
      episodes
      duration
      status
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      averageScore
      studios(isMain: true) {
        nodes {
          name
        }
      }
      relations {
        edges {
          relationType(version: 2)
          node {
            id
            title {
              romaji
            }
          }
        }
      }
      streamingEpisodes {
        title
        thumbnail
        url
        site
      }
      genres
      tags {
        name
      }
      externalLinks {
        site
        url
      }
      trailer {
        id
        site
      }
      recommendations {
        edges {
          node {
            mediaRecommendation {
              id
              title {
                romaji
              }
            }
          }
        }
      }
      staff {
        edges {
          node {
            id
            name {
              full
            }
            languageV2
          }
        }
      }
      characters {
        edges {
          node {
            id
            name {
              full
            }
            image {
              medium
            }
          }
        }
      }
      reviews {
        edges {
          node {
            id
            summary
            body
            rating
            user {
              id
              name
            }
          }
        }
      }
      stats {
        scoreDistribution {
          score
          amount
        }
        statusDistribution {
          status
          amount
        }
      }
    }
  }
`;

  const variables = {
    id: mediaID
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    data: {
      query: mediaIDQuery,
      variables: variables
    }
  };

  try {
    const response = await axios('https://graphql.anilist.co', options);
    const data = handleResponse(response);
    console.log(data);
    return data.data.Media;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching Media query data.');
  }
}

// Function to perform a search for anime based on the search term for the home page
async function searchData(searchTerm) {
  // GraphQL query to search for anime by name
  const searchQuery = `
    query SearchAnimeName($search: String) {
      Page(page: 1, perPage: 5) {
        media(search: $search, type: ANIME, sort:POPULARITY_DESC) {
          id
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
    throw new Error('An error occurred while fetching search data.');
  }
}

// Function to get a list of airing anime for current season
async function getAiringAnime() {
  // GraphQL query to fetch airing anime
  const airingQuery = `
  query airingAnime {
    Page(page: 1, perPage: 100) {
      media(
        status: RELEASING
        type: ANIME
        sort: TRENDING_DESC
        season: SUMMER
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
    throw new Error('An error occurred while fetching airing data.');
  }
}

// Function to get most popular anime overall
async function getPopularAnime() {
  // GraphQL query to fetch airing anime
  const popularQuery = `
  query popularAnime {
    Page(page: 1, perPage: 10) {
      media(
        type: ANIME
        sort: POPULARITY_DESC
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
        episodes
        averageScore
        popularity
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
      query: popularQuery,
      variables: variables
    }
  };

  try {
    const response = await axios('https://graphql.anilist.co', options);
    const data = handleResponse(response);
    return data.data.Page.media;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching airing data.');
  }
}

async function getPopularAiringAnime() {
  // GraphQL query to fetch airing anime
  const popularAiringQuery = `

  query airingAnimePopular {
    Page(page: 1, perPage: 10) {
      media(
        status: RELEASING
        type: ANIME
        sort: POPULARITY_DESC
        isAdult: false
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
        episodes
        popularity
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
      query: popularAiringQuery,
      variables: variables
    }
  };

  try {
    const response = await axios('https://graphql.anilist.co', options);
    const data = handleResponse(response);
    return data.data.Page.media;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching airing data.');
  }
}

// Function to handle the response from the API
function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
}

module.exports = {
  searchData,
  getAiringAnime,
  getPopularAnime,
  getPopularAiringAnime,
  queryMediaID
};
