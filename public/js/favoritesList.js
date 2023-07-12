/*

This code adds an event listener to the 'DOMContentLoaded' event, which triggers when the initial HTML document has been completely loaded and parsed. Within this event listener, it performs a series of API requests to fetch user information and favorited anime data.

Here's an overview of what this code does:

Attach an event listener to the 'DOMContentLoaded' event using the document.addEventListener() method.
Within the event listener, make an API request to fetch user information by calling fetch('/api/user-info').
Handle the response from the user info API request using .then() method:
Parse the response data as JSON using the .json() method.
Extract the userId from the response data.
Make another API request to fetch favorited anime data based on the userId by calling fetch(/api/favorited-anime?userId=${userId}).
Handle the response from the favorited anime API request using .then() method:
Parse the response data as JSON using the .json() method.
Process the favorited anime data by mapping each anime object into a new format that includes animeId and animeName.
Log the anime data and the favorited anime list for testing purposes.
Display the favorited anime list in the HTML document by:
Getting the container element with the ID 'favorited-anime' using document.getElementById().
Creating a list item for each favorited anime using document.createElement('li').
Creating an anchor element for each anime link using document.createElement('a').
Setting the href attribute of the anchor element to the anime media page URL.
Setting the text content of the anchor element to the anime name.
Appending the anchor element to the list item.
Appending the list item to the favorited anime container.
Handle any errors that occur during the API requests by using .catch() method to log the error messages.
This code demonstrates how to use the Fetch API to make API requests to retrieve user information and favorited anime data, and how to manipulate the DOM to display the fetched data in the HTML document.

*/

document.addEventListener('DOMContentLoaded', () => {
    fetch(`/api/user-info`)
        .then((response) => response.json())
        .then((data) => {
            const { userId } = data;

            // Fetch favorited anime using userId
            fetch(`/api/favorited-anime?userId=${userId}`)
                .then((response) => response.json())
                .then((animeData) => {
                // Process the favorited anime data
                const favoritedAnimeList = animeData.map((anime) => ({
                    animeId: anime.animeid,
                    animeName: anime.animename,
                }));
                console.log(animeData);
                console.log(favoritedAnimeList);
                // Display the favorited anime list
                const favoritedAnimeContainer = document.getElementById('favorited-anime');
                favoritedAnimeList.forEach((anime) => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = `/media/${anime.animeId}`;
                    link.textContent = anime.animeName;
                    listItem.appendChild(link);
                    favoritedAnimeContainer.appendChild(listItem);
                });
                })
            .catch((error) => {
            console.error('Error:', error);
            // Handle the error condition appropriately
});

        })
        .catch((error) => {
            console.error('Error fetching user info:', error);
        });
});
