// Get the current anime page ID from your session.
const animeId = getAnimeID();

// favorites.js (client-side JavaScript file)
document.addEventListener('DOMContentLoaded', () => {
    // Make GET request to retrieve user ID and anime ID
    fetch(`/api/user-anime-info/${animeId}`)
      .then((response) => response.json())
      .then((data) => {
        const { userId, animeId } = data;
        // Use the retrieved userId and animeId in your fetch request
        fetch(`/favorites/${userId}/${animeId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.exists) {
              // Data exists in favorites table
              console.log('Data exists:', data.data);
              // Perform further actions or display the data as needed
            } else {
              // Data does not exist in favorites table
              console.log('Data does not exist');
              // Perform further actions or display appropriate message
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            // Handle the error condition appropriately
          });
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error condition appropriately
      });
  });
  
  function getAnimeID() {
    // Get the current URL
    const currentURL = window.location.href;  
    // Extract the media number from the URL
    const animeId = currentURL.substring(currentURL.lastIndexOf('/') + 1);
    return animeId;
  }