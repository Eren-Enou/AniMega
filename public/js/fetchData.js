const axios = require('axios');

// Function to query media details based on the media ID
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

// Function to perform a search for anime based on the search term
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

// Function to get a list of airing anime
async function getAiringAnime() {
  // GraphQL query to fetch airing anime
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
  queryMediaID
};
