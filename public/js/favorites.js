// favorites.js (client-side JavaScript file)
document.addEventListener('DOMContentLoaded', () => {
    // Get the current anime page ID from your session.
    const animeId = getAnimeID();
    // Get the buttons
    const addToFavoritesBtn = document.getElementById('addToFavoritesBtn');
    const removeFromFavoritesBtn = document.getElementById('removeFromFavoritesBtn');
    // Make GET request to retrieve user ID and anime ID
    fetch(`/api/user-anime-info/${animeId}`)
      .then((response) => response.json())
      .then((data) => {
        const { userId, animeId } = data;
  


    // Make GET request to check if data exists in favorites table
    fetch(`/api/favorites/${userId}/${animeId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          // Data exists in favorites table
          console.log('Data exists:', data.data);
          addToFavoritesBtn.style.display = 'none'; // Hide "Add to Favorites" button
          removeFromFavoritesBtn.style.display = 'block'; // Show "Remove from Favorites" button
        } else {
          // Data does not exist in favorites table
          console.log('Data does not exist');
          addToFavoritesBtn.style.display = 'block'; // Show "Add to Favorites" button
          removeFromFavoritesBtn.style.display = 'none'; // Hide "Remove from Favorites" button
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error condition appropriately
      });
  
    // Add event listener to "Add to Favorites" button
    addToFavoritesBtn.addEventListener('click', () => {
      // Make POST request to add data to favorites table
      fetch(`/api/favorites/${userId}/${animeId}`, {
        method: 'POST',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data added to favorites:', data.message);
          addToFavoritesBtn.style.display = 'none'; // Hide "Add to Favorites" button
          removeFromFavoritesBtn.style.display = 'block'; // Show "Remove from Favorites" button
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error condition appropriately
        });
    });
  
    // Add event listener to "Remove from Favorites" button
    removeFromFavoritesBtn.addEventListener('click', () => {
      // Make DELETE request to remove data from favorites table
      fetch(`/api/favorites/${userId}/${animeId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data removed from favorites:', data.message);
          addToFavoritesBtn.style.display = 'block'; // Show "Add to Favorites" button
          removeFromFavoritesBtn.style.display = 'none'; // Hide "Remove from Favorites" button
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error condition appropriately
        });
    });
  });
});
  function getAnimeID() {
    // Get the current URL
    const currentURL = window.location.href;  
    // Extract the media number from the URL
    const animeId = currentURL.substring(currentURL.lastIndexOf('/') + 1);
    return animeId;
  };