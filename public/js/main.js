//UNUSED Practicing search code
/*

This code demonstrates a practice search implementation using GraphQL and Axios for making an API request. It includes code to define the search query, make an API request, handle the response, and export the search function.

Here's an overview of what this code does:

Declare a search query variable using GraphQL syntax to search for anime titles.
Set the URL for the API endpoint.
Set the options object for the API request, including the request method, headers, and data.
Set up an event listener for the "DOMContentLoaded" event to execute code when the HTML document has finished loading.
Get the search form element from the DOM.
Attach an event listener to the form submit event to handle the search functionality.
Get the search input element and retrieve the search term value when the form is submitted.
Call the makeAPIRequest() function, passing in the search term.
Define the makeAPIRequest() function to handle the API request logic.
Log the search term for testing purposes.
Define the searchData() function to make the HTTP API request using Axios, passing in the URL and options.
Define the handleResponse() function to handle the API response and return the response data or throw an error.
Export the searchData() function.
This code demonstrates a basic search implementation using GraphQL and Axios, allowing you to make an API request and handle the response.

*/

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