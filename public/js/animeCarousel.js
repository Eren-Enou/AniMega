$(document).ready(function() {
    var carousel = $('.anime-carousel-container');
    var carouselList = $('.anime-carousel-list');
    var carouselItems = $('.anime-carousel-item');
    var carouselBtnPrev = $('.carousel-btn-prev');
    var carouselBtnNext = $('.carousel-btn-next');
    var itemWidth = carouselItems.first().outerWidth(true);
    var visibleItems = Math.floor(carousel.width() / itemWidth);
    var totalItems = carouselItems.length;
    var currentPosition = 0;
    var maxPosition = (totalItems - visibleItems) * itemWidth;
    var scrollingInterval;
    const animeCarouselItems = document.querySelectorAll('.anime-carousel-item');
  
    function startScrolling() {
      scrollingInterval = setInterval(function() {
        currentPosition -= itemWidth;
        if (currentPosition < -maxPosition) {
          currentPosition = 0;
        }
        carouselList.animate({ scrollLeft: -currentPosition + 'px' }, 2000);
      }, 2000);
    }
  
    function stopScrolling() {
      clearInterval(scrollingInterval);
    }
  
    carousel.on('mouseenter', function() {
      carouselList.css('overflow-x', 'auto');
      stopScrolling();
    });
  
    carousel.on('mouseleave', function() {
      carouselList.css('overflow-x', 'scroll');
      startScrolling();
    });
  
    carouselBtnPrev.on('click', function() {
      currentPosition += itemWidth;
      if (currentPosition > 0) {
        currentPosition = -maxPosition;
      }
      carouselList.animate({ scrollLeft: -currentPosition + 'px' },  2000);
      stopScrolling(); // Stop automatic scrolling on manual button click
    });
  
    carouselBtnNext.on('click', function() {
      currentPosition -= itemWidth;
      if (currentPosition < -maxPosition) {
        currentPosition = 0;
      }
      carouselList.animate({ scrollLeft: -currentPosition + 'px' },  2000);
      stopScrolling(); // Stop automatic scrolling on manual button click
    });
  
    startScrolling(); // Start automatic scrolling initially

    // Attach click event listener to each anime carousel item
    animeCarouselItems.forEach(item => {
    item.addEventListener('click', () => {
      // Retrieve the data-id attribute value
      const dataId = item.getAttribute('data-id');
      console.log(dataId); // Output: The value of data-id attribute for the clicked item
  
      // Perform any additional actions with the retrieved data-id value
      window.location.href = `/media/${dataId}`;
    });
  });
  });
  



