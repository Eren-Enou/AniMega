const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

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

// Function to simulate fetching search results from API
// function getSearchResults(searchTerm) {
//   // This can be replaced with an actual API call to retrieve search results
//   const mockResults = ['Result 1', 'Result 2', 'Result 3', 'Result 4', 'Result 5'];
//   return mockResults.filter(result => result.toLowerCase().includes(searchTerm.toLowerCase()));
// }
