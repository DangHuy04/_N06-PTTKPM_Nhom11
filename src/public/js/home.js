document.addEventListener('DOMContentLoaded', function() {
  var carousel = new bootstrap.Carousel(document.querySelector('#carouselExample1','#carouselExample'), {
      interval: 3000, 
      wrap: true 
  });
});