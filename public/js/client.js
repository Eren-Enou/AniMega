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
        // You can use AJAX or fetch API to make the request
        // Example using fetch API
        fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ searchTerm: searchTerm })
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log(data);
        })
        .catch(error => {
            // Handle errors
            console.error(error);
        });
    }
});
