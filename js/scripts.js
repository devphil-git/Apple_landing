import Swiper from '../lib/swiper-bundle.esm.browser.min.js';

// Slider Swiper https://swiperjs.com/

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
   preventClick: true,
   a11y: false,
});



// Modal

const productLink = document.querySelectorAll('.product__link');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal__close');
const body = document.querySelector('body');
const scrollWidth = window.innerWidth - document.documentElement.clientWidth;  // Ширина полосы прокрутки


// Modal Show/Hide 

productLink.forEach((item) => {
   item.addEventListener('click', () => {
      modal.classList.add('modal--active');
      body.style.overflow = 'hidden';
      body.style.paddingRight = scrollWidth + 'px';
   })
})

modal.addEventListener('click', (event) => {
   if (event.target === modal || event.target === modalCloseBtn) {
      modal.classList.remove('modal--active');
      body.style.overflow = 'auto';
      body.style.paddingRight = '0';
   }
})

window.addEventListener("keydown", (event) => {
   if (modal.classList.contains('modal--active') && event.key === 'Escape') {
      modal.classList.remove('modal--active');
      body.style.overflow = 'auto';
      body.style.paddingRight = '0';
   }
})

// Modal input placeholder

const formPlaceholder = document.querySelectorAll('.form__placeholder');
const formInput = document.querySelectorAll('.form__input');

formInput.forEach((item, i) => {
   item.addEventListener('focus', () => {
      formPlaceholder[i].classList.add('form__placeholder--active');
   })

   item.addEventListener('blur', () => {
      if (item.value === '') {
         formPlaceholder[i].classList.remove('form__placeholder--active');
      }
   })
})



// Countries Menu by SimpleBar https://grsmto.github.io/simplebar/

new SimpleBar(document.querySelector('.country__list'), {
   classNames: {
      scrollbar: 'country__scrollbar',
      track: 'country__track',
   }
})



// Price by APILayer https://apilayer.com/

const dataCurrency = {};

const formatCurrency = (value, currency) => {
   return new Intl.NumberFormat('EU', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
   }).format(value)
}

const showPrice = (currency = 'USD') => {
   const priceElems = document.querySelectorAll('[data-price]');

   priceElems.forEach(elem => {
      const roundPrice = Math.ceil(elem.dataset.price * dataCurrency[currency] / 10) * 10;
      elem.textContent = formatCurrency(roundPrice, currency);
   })
}

// Запрос к курсам валют через Fixer API в APILayer https://apilayer.com/
// Foreign exchange rates and currency conversion JSON API.
// "GET /latest" - returns real-time exchange rate data updated every 60 minutes, every 10 minutes or every 60 seconds.

const myHeaders = new Headers();
myHeaders.append("apikey", "xlw8W9v6DSM3F9sWjaNySyIA9JwVJmTU");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/fixer/latest?base=USD", requestOptions)
  .then(response => response.json())
  .then(result => {
     Object.assign(dataCurrency, result.rates);
     showPrice();
  })
  .catch(error => console.log('error', error));



// Countries Menu Show/Hide 

const countryMenu = document.querySelector('.country__menu');
const countryWrapper = document.querySelector('.country__wrapper');

countryMenu.addEventListener('click', () => {
   countryWrapper.classList.toggle('country__wrapper--open');
})

countryWrapper.addEventListener('click', ({target}) => {
   if (target.classList.contains('country__btn')) {
      countryWrapper.classList.remove('country__wrapper--open');
      countryMenu.innerText = target.innerText;
      showPrice(target.dataset.currency);
   }
})

