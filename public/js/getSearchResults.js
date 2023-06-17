//Practicing search code

function getSearchResults(searchTerm) {
    var searchQuery = `
      query SearchAnimeName($search: String) {
        Page(page: 1, perPage: 5) {
          media(search: $search, type: ANIME) {
            title {
              english
              native
            }
          }
        }
      }
    `;
  
    var variables = {
      search: searchTerm
    };
  
    var url = 'https://graphql.anilist.co';
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: {
        query: searchQuery,
        variables: variables
      }
    };
  
    // Make the API call using Axios or any other HTTP library
    axios(url, options)
      .then(handleResponse)
      .catch(handleError);
  }
  
  function handleResponse(response) {
    if (response.status === 200) {
      var data = response.data;
      // Process the data and display the search results
      console.log(data);
    } else {
      // Handle error response
      console.error('An error occurred:', response.statusText);
    }
  }
  
  function handleError(error) {
    // Handle error case
    console.error('An error occurred:', error);
  }
  