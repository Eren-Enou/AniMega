/*

This client-side JavaScript code is used to handle searching for anime titles and displaying the search results on a web page. It utilizes the Fetch API to send a request to the server and retrieve the search results based on the user's input.

Here's an overview of what this code does:

Get references to the search input and results container elements in the HTML.
Add an event listener to the search input for capturing user input. Whenever the input value changes, the event listener callback function is triggered.
Inside the event listener callback function, retrieve the search term from the search input.
Use the Fetch API to send a GET request to the server, passing the search term as a query parameter in the URL (/api/fetchData?searchTerm=${encodeURIComponent(searchTerm)}).
Handle the response from the server using the .then() method:
Parse the response data as JSON using the .json() method.
Call the displayResults() function and pass in the response data.
In the displayResults() function, clear any previous search results from the results container element.
If there are no results (results.length === 0), create a paragraph element with the text "No results found" and append it to the results container.
If there are results, create a dropdown menu container and iterate over each result:
Create a dropdown item element for each result, displaying the anime title.
Add a click event listener to each dropdown item that performs an action when clicked (in this case, navigating to a details page).
Append each dropdown item to the dropdown menu container.
Finally, append the dropdown menu container to the results container element.
This code demonstrates how to handle user input, send a request to the server, and dynamically display the search results on the web page. It also shows how to add event listeners and perform actions based on user interactions, such as clicking on a dropdown item to navigate to a details page.

*/

// Client-side JavaScript

// Get references to HTML elements
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

// Add event listener to search input for capturing user input
searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value;
  
  // Fetch data from the server using the provided search term
  fetch(`/api/fetchData?searchTerm=${encodeURIComponent(searchTerm)}`)
    .then(response => response.json())
    .then(data => {
      // Display the fetched results
      displayResults(data);
    })
    .catch(error => {
      console.error(error);
    });
});

// Function to display the search results on the web page
function displayResults(data) {
  // Clear previous results
  resultsContainer.innerHTML = '';

  const results = data;

  if (results.length === 0) {
    // No results found
    const noResultsElement = document.createElement('p');
    noResultsElement.textContent = 'No results found.';
    noResultsElement.classList.add('anime-dropdown-item');
    resultsContainer.appendChild(noResultsElement);
  } else {
    // Create dropdown menu container
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('anime-dropdown-menu');

    // Create dropdown items for each result
    results.forEach(result => {
      const title = result.title.english || result.title.romaji;

      const dropdownItem = document.createElement('div');
      dropdownItem.textContent = title;
      dropdownItem.classList.add('anime-dropdown-item');

      // Add click event listener to the dropdown item
      dropdownItem.addEventListener('click', function() {
        // Perform action when the item is clicked, e.g., navigate to a details page
        console.log('Clicked:', title);
        window.location.href = `/media/${result.id}`;
      });

      dropdownMenu.appendChild(dropdownItem);
    });

    // Append the dropdown menu to the results container
    resultsContainer.appendChild(dropdownMenu);
    console.log(resultsContainer);
  }
}
