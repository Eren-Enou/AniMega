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

