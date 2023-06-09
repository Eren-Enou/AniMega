// Client-side JavaScript (client.js)

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value;
  fetch(`/api/fetchData?searchTerm=${encodeURIComponent(searchTerm)}`)
    .then(response => response.json())
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

  const results = data;

  if (results.length === 0) {
    // No results found
    const noResultsElement = document.createElement('p');
    noResultsElement.textContent = 'No results found.';
    resultsContainer.appendChild(noResultsElement);
  } else {
    // Create dropdown menu container
    const dropdownMenu = document.createElement('div');

    // Create dropdown items for each result
    results.forEach(result => {
      const title = result.title.english || result.title.romaji;

      const dropdownItem = document.createElement('div');
      dropdownItem.textContent = title;

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

