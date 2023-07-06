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
                    const favoritedAnimeList = animeData.map((anime) => anime.animeId);
                    console.log(animeData);
                    console.log(favoritedAnimeList);
                    // Display the favorited anime list
                    const favoritedAnimeContainer = document.getElementById('favorited-anime');
                    favoritedAnimeList.forEach((animeId) => {
                        const listItem = document.createElement('li');
                        listItem.textContent = animeId;
                        favoritedAnimeContainer.appendChild(listItem);
                        console.log(animeId);
                    });
                })
                .catch((error) => {
                    console.error('Error fetching favorited anime:', error);
                });
        })
        .catch((error) => {
            console.error('Error fetching user info:', error);
        });
});
