/*

This client-side JavaScript code is used to handle adding and removing anime from the user's favorites. It is designed to be executed when the DOM is fully loaded.

Here's an overview of what this code does:

Attach an event listener to the 'DOMContentLoaded' event using the document.addEventListener() method.
Within the event listener, get the anime ID from the current URL using the getAnimeID() function.
Make a GET request to retrieve user ID and anime ID by calling fetch(/api/user-anime-info/${animeId}).
Handle the response from the user-anime-info API request using .then() method:
Parse the response data as JSON using the .json() method.
Extract the userId and animeId from the response data.
Make another GET request to check if the anime data exists in the favorites table by calling fetch(/api/favorites/${userId}/${animeId}).
Handle the response from the favorites API request using .then() method:
Parse the response data as JSON using the .json() method.
Based on the response, show/hide the "Add to Favorites" and "Remove from Favorites" buttons accordingly.
Add an event listener to the "Add to Favorites" button using the .addEventListener() method.
When the button is clicked, make a POST request to add the anime data to the favorites table by calling fetch(/api/favorites/${userId}/${animeId}, { method: 'POST' }).
Handle the response from the favorites POST request using .then() method:
Parse the response data as JSON using the .json() method.
Show/hide the "Add to Favorites" and "Remove from Favorites" buttons based on the response.
Add an event listener to the "Remove from Favorites" button using the .addEventListener() method.
When the button is clicked, make a DELETE request to remove the anime data from the favorites table by calling fetch(/api/favorites/${userId}/${animeId}, { method: 'DELETE' }).
Handle the response from the favorites DELETE request using .then() method:
Parse the response data as JSON using the .json() method.
Show/hide the "Add to Favorites" and "Remove from Favorites" buttons based on the response.
The getAnimeID() function extracts the anime ID from the current URL by getting the substring after the last '/' character.
This code demonstrates how to use the Fetch API to make GET, POST, and DELETE requests to add and remove anime from the user's favorites. It also dynamically updates the button visibility based on the existence of the anime data in the favorites table.

*/

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