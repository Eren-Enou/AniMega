/*

This code defines a JavaScript function to handle a button click event for adding an anime to a user's favorites. It also includes helper functions to retrieve the current user ID and anime ID, as well as an event listener to attach the click event to the button.

Here's an overview of what this code does:

Define a function named addToFavorites() to handle the button click event.
Retrieve the current user ID from your session using the getUserID() helper function.
Retrieve the current anime page ID from your session using the getAnimeID() helper function.
Create a data object containing the user ID and anime ID.
Make an API request to the backend server using the fetch() function, sending the data as a JSON payload.
Handle the response from the server:
If the response status is OK, log a success message and perform any desired actions after the anime is added to favorites.
If the response status is not OK, log an error message and handle the error case appropriately.
Handle potential errors during the API request and provide appropriate error messages.
Define a getUserID() helper function to retrieve the user ID dynamically from your authentication or session system.
Define a getAnimeID() helper function to extract the anime ID from the current URL.
Attach an event listener to the button with the ID 'addFavoriteButton' to trigger the addToFavorites() function on a click event.
This code aims to enable adding an anime to a user's favorites by making an API request to the backend server based on the current user and anime information.

*/

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
