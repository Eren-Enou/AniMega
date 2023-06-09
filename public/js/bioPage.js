  // Maximum number of characters to show initially
  const maxLength = 250;

  const descriptionElement = document.getElementById('description');
  const toggleElement = document.querySelector('.description-length-toggle');

  // Get the full description text
  const fullText = descriptionElement.innerHTML.trim();

  if (fullText.length > maxLength) {
    // Truncate the description to the maximum length
    const truncatedText = fullText.slice(0, maxLength).trim() + '...';

    // Set the truncated text as the initial content
    descriptionElement.innerHTML = truncatedText;

    // Show the "Read More" button
    toggleElement.style.display = 'inline';

    // Add click event listener to toggle the full text
    toggleElement.addEventListener('click', () => {
      if (toggleElement.textContent === 'Read More') {
        descriptionElement.innerHTML = fullText;
        toggleElement.textContent = 'Read Less';
      } else {
        descriptionElement.innerHTML = truncatedText;
        toggleElement.textContent = 'Read More';
      }
    });
  } else {
    // The description doesn't exceed the maximum length, hide the "Read More" button
    toggleElement.style.display = 'none';
  }