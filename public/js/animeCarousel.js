document.addEventListener("DOMContentLoaded", function() {
  var carousel = document.querySelector(".anime-carousel-list");
  var prevBtn = document.querySelector(".carousel-btn-prev");
  var nextBtn = document.querySelector(".carousel-btn-next");

  var currentSlide = 0;
  var totalSlides = document.querySelectorAll(".anime-carousel-item").length;

  function updateSlide() {
    var windowWidth = window.innerWidth;
    var itemWidth = Math.min(250, windowWidth / 4); // Maximum of 250 or 25% of the window width
    var visibleSlides = Math.floor(windowWidth / itemWidth); // Number of visible slides based on the window width
    var carouselWidth = itemWidth * totalSlides;
    var offset = -currentSlide * Math.abs(itemWidth) + "px";
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
