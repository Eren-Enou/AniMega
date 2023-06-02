const animeContainer = document.getElementById('anime-container');

async function fetchTrendingAnime() {
    try {
        const response = await fetch('https://api.anilist.co/anime/trending');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

async function displayTrendingAnime() {
    const trendingAnime = await fetchTrendingAnime();

    // Iterate over each anime and create an image box
    trendingAnime.forEach(anime => {
        const imageBox = document.createElement('div');
        imageBox.classList.add('image-box');

        const title = document.createElement('p');
        title.textContent = anime.title.english || anime.title.native;
        imageBox.appendChild(title);

        const image = document.createElement('img');
        image.src = anime.coverImage.large;
        imageBox.appendChild(image);

        animeContainer.appendChild(imageBox);
    });

    // Start the rotation
    startRotation();
}

function startRotation() {
    const imageBoxes = document.getElementsByClassName('image-box');
    let currentIndex = 0;

    // Display the current image box and hide the others
    function showImageBox(index) {
        for (let i = 0; i < imageBoxes.length; i++) {
            if (i === index) {
                imageBoxes[i].style.display = 'block';
            } else {
                imageBoxes[i].style.display = 'none';
            }
        }
    }

    // Rotate through the image boxes
    function rotateImageBoxes() {
        showImageBox(currentIndex);

        currentIndex++;
        if (currentIndex >= imageBoxes.length) {
            currentIndex = 0;
        }

        setTimeout(rotateImageBoxes, 3000); // Change image every 3 seconds
    }

    rotateImageBoxes();
}

// Call the function to display the trending anime
displayTrendingAnime();
