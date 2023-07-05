
// Function to handle the button click event
function addToFavorites() {
  // Get the current user ID from your session
  const userId = getUserID();

  // Get the current anime page ID from your session.
  const animeId = getAnimeID();

  // Request data
  const data = {
    userId: userId,
    animeId: animeId
  };
// Make an API request to the backend server to add the anime to the user's favorites
fetch('/api/favorites', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => {
  if (response.ok) {
    console.log('Anime added to favorites successfully!');
    // Do something after the anime is added to favorites
  } else {
    console.log('1 Error adding anime to favorites:', response.status);
    // Handle the error case appropriately
  }
})
.catch(error => {
  console.log('2 Error adding anime to favorites:', error);
  // Handle the error case appropriately
});
}

function getUserID() {
  // Retrieve the user ID dynamically from your current authentication or session system
  const userId = document.getElementById('addFavoriteButton').dataset.userId;
  console.log(userId);
  return userId;
}

function getAnimeID() {
  // Get the current URL
  const currentURL = window.location.href;  
  // Extract the media number from the URL
  const animeId = currentURL.substring(currentURL.lastIndexOf('/') + 1);
  return animeId;
}

// Attach an event listener to the button
const addFavoriteButton = document.getElementById('addFavoriteButton');
addFavoriteButton.addEventListener('click', addToFavorites);
