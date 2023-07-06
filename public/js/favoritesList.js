document.addEventListener('DOMContentLoaded', () => {
    fetch(`/api/user-info`)
        .then((response) => response.json())
        .then((data) => {
            const { userId } = data;

            // Fetch favorited anime using userId
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
