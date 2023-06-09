const axios = require('axios');

async function queryMediaID(mediaID) {
  const mediaIDQuery = `
  query($id:Int) {
    Media(id: $id) {
      bannerImage
      coverImage{
        medium
      }
      title {
        romaji
        english
        native
      }
      description
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


async function searchData(searchTerm) {
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
    throw new Error('An error occurred while fetching airing data.');
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
  searchData,
  getAiringAnime,
  queryMediaID
};
