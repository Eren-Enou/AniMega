/*
This client-side JavaScript code sets up an event listener on an input field for capturing user input during a search. As the user types in the input field, the code simulates an API call to fetch search results based on the entered search term.

Here's an overview of what this code does:

Get references to the search input field and the container for displaying search results in the HTML.
Add an event listener to the search input field for the 'input' event, which triggers whenever the user enters or modifies text in the input field.
When the 'input' event is fired, the event listener function is executed, and it captures the entered search term from the event target's value.
Simulate an API call to fetch search results based on the search term. In this code snippet, the getSearchResults function is called, but the implementation is commented out. This function would typically handle the actual API request and return the search results.
Clear the previous search results from the search results container.
Iterate over the search results and create list items (<li>) for each result.
Add a click event listener to each list item. When a search result is clicked, the event listener function is executed:
Set the clicked search result as the value of the search input field.
Clear the search results container, removing the dropdown of search results.
This code provides a basic structure for implementing a search functionality with live search results. You would need to uncomment the getSearchResults function and implement the logic to fetch actual search results from an API based on the entered search term.
*/

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('resultsContainer');

// const getSearchResults = require('./public/js/getSearchResults');

searchInput.addEventListener('input', function(event) {
  const searchTerm = event.target.value;
  console.log(searchTerm);
  
  // Simulating API call to fetch search results
  const results = getSearchResults(searchTerm);

  // Clear previous results
  searchResults.innerHTML = '';

  // Display search results in dropdown
  results.forEach(result => {
    const li = document.createElement('li');
    li.textContent = result;
    li.addEventListener('click', function() {
      // Set selected search result as input value
      searchInput.value = result;
      // Clear the dropdown
      searchResults.innerHTML = '';
    });
    searchResults.appendChild(li);
  });
});

