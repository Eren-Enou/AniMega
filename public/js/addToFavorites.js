//Work in Progress Code

// Function to handle the button click event
function addToFavorites() {
    // Get the current user ID from your authentication system or session
    const userId = getUserID();
    // Get the anime ID from the page query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');
  
    // Make an API request to the backend server to add the anime to the user's favorites
    fetch('/api/add-to-favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        animeId: animeId,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Anime added to favorites:', data);
        // Handle the response as needed, e.g., display a success message to the user
      })
      .catch(error => {
        console.error('Error adding anime to favorites:', error);
        // Handle the error, e.g., display an error message to the user
      });
  }
  
  function getUserID(){
    const userId = 123;
    return userId;
  }
  // Attach an event listener to the button
  const addFavoriteButton = document.getElementById('addFavoriteButton');
  addFavoriteButton.addEventListener('click', addToFavorites);
  