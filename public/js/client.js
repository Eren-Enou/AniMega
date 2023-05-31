document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('resultsContainer');

  searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value;
    fetchData(searchTerm)
      .then(data => {
        displayResults(data);
      })
      .catch(error => {
        console.error(error);
      });
  });

  function displayResults(data) {
    // Clear previous results
    resultsContainer.innerHTML = '';

    const results = data.Page.media;

    if (results.length === 0) {
      // No results found
      const noResultsElement = document.createElement('p');
      noResultsElement.textContent = 'No results found.';
      resultsContainer.appendChild(noResultsElement);
    } else {
      // Display each result in a dropdown item
      results.forEach(result => {
        const title = result.title.english || result.title.native;

        const dropdownItem = document.createElement('div');
        dropdownItem.classList.add('dropdown-item');
        dropdownItem.textContent = title;

        // Add click event listener to the dropdown item
        dropdownItem.addEventListener('click', function() {
          // Perform action when the item is clicked, e.g., navigate to a details page
          console.log('Clicked:', title);
        });

        resultsContainer.appendChild(dropdownItem);
      });
    }
  }
});
