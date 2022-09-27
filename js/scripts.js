import Swiper from '../lib/swiper-bundle.esm.browser.min.js';

new Swiper('.goods__swiper', {
   slidesPerView: 1,
   spaceBetween: 20,
   // loop: true,
   breakpoints: {
      320: {

      },
      768: {
         slidesPerView: 2,
      },
      1024: {
         slidesPerView: 2,
         spaceBetween: 24,
      },
      1440: {
         slidesPerView: 3,
         spaceBetween: 24,
      },
   },
   navigation: {
      prevEl: '.goods__arrow__prev',
      nextEl: '.goods__arrow__next',
   },
});