/*

This client-side JavaScript code is used to handle truncating and toggling the display of a long description text on a web page. It allows the user to initially see a shortened version of the text and provides a "Read More" button to expand and collapse the full text.

Here's an overview of what this code does:

Define the maximum number of characters to show initially using the maxLength variable.
Get references to the description element and the toggle element (the "Read More" button) in the HTML.
Get the full description text from the description element's content.
Check if the length of the full text exceeds the maximum length.
If the full text is longer than the maximum length:
Truncate the description to the maximum length and add ellipsis.
Set the truncated text as the initial content of the description element.
Show the "Read More" button by setting its display style to 'inline'.
Add a click event listener to the toggle element that toggles the display of the full text when clicked:
If the toggle element's text content is "Read More", replace the truncated text with the full text and change the toggle element's text content to "Read Less".
If the toggle element's text content is "Read Less", replace the full text with the truncated text and change the toggle element's text content to "Read More".
If the description doesn't exceed the maximum length:
Hide the "Read More" button by setting its display style to 'none'.
This code provides a user-friendly way to manage long descriptions by showing an abbreviated version initially and allowing the user to expand and collapse the full text as desired. It enhances the user experience by avoiding overwhelming them with excessive content while still providing the option to view the complete description when needed.
*/

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