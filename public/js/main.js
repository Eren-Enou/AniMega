var searchQuery = `
query SearchAnimeName($search: String) {
    Page(page:1, perPage:5){
        media(search: $search, type: ANIME) {
      title {
        english
        native
      }
    }
    }
  }
`;

var url = 'https://graphql.anilist.co',
            options = {
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

document.addEventListener('DOMContentLoaded', function() {
    // Get the search form element
    const searchForm = document.getElementById('searchForm');

    // Add event listener to form submit event
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get the search input element
        const searchInput = document.getElementById('searchInput');

        // Get the search term value
        const searchTerm = searchInput.value;

        // Pass the search term to your API request function or further processing logic
        makeAPIRequest(searchTerm);
    });

    // Function to make the API request
    function makeAPIRequest(searchTerm) {
        // Your API request logic goes here
        console.log('Search Term:', searchTerm);
        // Perform your API request using the searchTerm variable
        // Define our query variables and values that will be used in the query request
        variables = {
            search: searchTerm
        };

        // Define the config we'll need for our Api request
  
            }
        });

// Make the HTTP Api request
function searchData() {
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


module.exports = searchData();