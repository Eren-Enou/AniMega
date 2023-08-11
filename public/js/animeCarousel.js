/*

This code sets up an event listener for the "DOMContentLoaded" event, which triggers the execution of JavaScript code related to a carousel functionality. It includes functions to update the carousel slide, navigate to the next slide, navigate to the previous slide, and handle window resize events.

Here's an overview of what this code does:

Set up event listeners for the "DOMContentLoaded" event, which ensures that the JavaScript code executes when the HTML document has finished loading.
Retrieve references to the carousel element, previous button, and next button from the DOM.
Initialize variables to keep track of the current slide and the total number of slides.
Define a function named updateSlide() to update the carousel slide based on the window width and the current slide index.
Calculate the item width based on the window width and a maximum value.
Determine the number of visible slides based on the window width.
Calculate the total width of the carousel based on the item width and the total number of slides.
Calculate the offset for the current slide.
Update the width and transform properties of the carousel element to display the appropriate slide.
Define a function named nextSlide() to navigate to the next slide.
Update the current slide index by incrementing it and using the modulo operator to ensure it stays within the range of the total number of slides.
Call the updateSlide() function to update the display.
Define a function named prevSlide() to navigate to the previous slide.
Decrement the current slide index and wrap around to the last slide if it becomes less than 0.
Call the updateSlide() function to update the display.
Attach event listeners to the previous and next buttons to trigger the respective slide navigation functions on click events.
Attach a window resize event listener to update the slide display when the window size changes.
Call the updateSlide() function initially to set up the initial slide display.
This code aims to provide a carousel functionality that can be used to navigate through a set of slides, with responsive behavior based on the window size.

*/
document.addEventListener("DOMContentLoaded", function() {
  let carousel = document.querySelector(".anime-carousel-list");
  let prevBtn = document.querySelector(".carousel-btn-prev");
  let nextBtn = document.querySelector(".carousel-btn-next");

  let currentSlide = 0;
  let totalSlides = document.querySelectorAll(".anime-carousel-item").length;

  function updateSlide() {
    let windowWidth = window.innerWidth;
    let itemWidth = Math.min(250, windowWidth / 4); // Maximum of 250 or 25% of the window width
    let visibleSlides = Math.floor(windowWidth / itemWidth); // Number of visible slides based on the window width
    let carouselWidth = itemWidth * totalSlides;
    let offset = -currentSlide * Math.abs(itemWidth) + "px";
    carousel.style.width = carouselWidth + "px";
    carousel.style.transform = "translateX(" + offset + ")";
  }
  
  
  

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  }
  

  function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = totalSlides - 1;
    }
    updateSlide();
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Update slide on window resize
  window.addEventListener("resize", function() {
    updateSlide();
  });

  // Initial slide update
  updateSlide();
});
