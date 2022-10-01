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
      if (item.value == '') {
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


// Timer

   // Склонение подписи
const declOfNum = (n, titles) => 
   titles[n % 10 === 1 && n % 100 !== 11 
      ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) 
      ? 1 : 2];


const timer = (deadline) => {

   const unitDays = document.querySelector('.timer__unit--days');
   const unitHours = document.querySelector('.timer__unit--hours');
   const unitMinutes = document.querySelector('.timer__unit--minutes');
   const descrDays = document.querySelector('.timer__descr--days');
   const descrHours = document.querySelector('.timer__descr--hours');
   const descrMinutes = document.querySelector('.timer__descr--minutes');

   const getTimeRemaning = () => {
      const dateStop = new Date(deadline).getTime();
      const dateNow = Date.now();
      const timeRemaning = dateStop - dateNow;

      const mseconds = timeRemaning;
      const seconds = Math.floor(mseconds / 1000 % 60);
      const minutes = Math.floor(mseconds / 1000 / 60 % 60);
      const hours =   Math.floor(mseconds / 1000 / 60 / 60 % 24);
      const days =    Math.floor(mseconds / 1000 / 60 / 60 / 24 % 365);       //  seconds(1000) / minutes(60) / hours(60) / days(24)

      // console.log('mseconds: ', mseconds);
      // console.log('seconds: ', seconds);
      // console.log('minutes: ', minutes);
      // console.log('hours: ', hours);
      // console.log('days: ', days);

      return { timeRemaning, minutes, hours, days, seconds }
   }

   const start = () => {
      const timer = getTimeRemaning();

      unitDays.textContent = timer.days;
      unitHours.textContent = (timer.hours < 10 ? '0' + timer.hours : timer.hours);
      unitMinutes.textContent = (timer.minutes < 10 ? '0' + timer.minutes : timer.minutes);

      // console.log('seconds: ', timer.seconds < 10 ? '0' + timer.seconds : timer.seconds);

      descrDays.textContent = declOfNum(timer.days, ['день', 'дня', 'дней']);
      descrHours.textContent = declOfNum(timer.hours, ['час', 'часа', 'часов']);
      descrMinutes.textContent = declOfNum(timer.minutes, ['минута', 'минуты', 'минут']);

      const timerId = setTimeout(start, 1000);  // константа для остановки
      // setTimeout(start, 1000);

      if (timer.timeRemaning < 0) {
         clearTimeout(timerId);
         unitDays.textContent = '0';
         unitHours.textContent = '00';
         unitMinutes.textContent = '00';
      }
   };

   start();
}

// timer('2022/12/12 21:00');

const dateTest = Date.now() + 113456789;
timer(dateTest);



// Маска телефона

const mask = event => {
   const { target, keyCode, type } = event;
   const pos = target.selectionStart;
   if (pos < 3) event.preventDefault();
   const matrix = '+7 (___) ___-__-__';
   let i = 0;
   const def = matrix.replace(/\D/g, '');
   const val = target.value.replace(/\D/g, '');
   let newValue = matrix.replace(/[_\d]/g,
      a => (i < val.length ? val[i++] || def[i] : a));
   i = newValue.indexOf('_');
   
   if (i !== -1) {
      i < 5 && (i = 3);
      newValue = newValue.slice(0, i);
   }
   
   let reg = matrix.substring(0, target.value.length).replace(/_+/g,
      (a) => `\\d{1,${a.length}}`).replace(/[+()]/g, '\\$&');
   
   reg = new RegExp(`^${reg}$`);
   
   if (!reg.test(target.value) || target.value.length < 5 ||
      keyCode > 47 && keyCode < 58) {
      target.value = newValue;
   }
   
   if (type === 'blur' && target.value.length < 5) {
      target.value = '';
      input.previousElementSibling.classList.remove('form__placeholder--active');
   }
 };
 
 const input = document.querySelector('.form__input--phone');
 
 if (input.type === 'tel') {
   input.addEventListener('input', mask);
   input.addEventListener('focus', mask);
   input.addEventListener('blur', mask);
   input.addEventListener('keydown', mask);
 }
 
 
 









/*     СКЛОНЕНИЯ ПОДПИСЕЙ     */

/*
const arr = ['год', 'года', 'лет']

{ // 1 пример склонение слова
	const onlyWord = document.querySelectorAll('.only_word');

	// возвращает только слово
	const declOfNum = (n, titles) => titles[n % 10 === 1 && n % 100 !== 11 ?
	  0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
	

	onlyWord[0].textContent = declOfNum(1, arr);
	onlyWord[1].textContent = declOfNum(33, arr);
	onlyWord[2].textContent = declOfNum(49, arr);
}

{ // 2 пример склонение слова + число
	const numAndWord = document.querySelectorAll('.num_and_word');

	// возвращает число и слово
	const declOfNum = (n, titles) => n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
		0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
	

	numAndWord[0].textContent = declOfNum(49, arr);
	numAndWord[1].textContent = declOfNum(53, arr);
	numAndWord[2].textContent = declOfNum(71, arr);
}

{ // 3 пример возвращает число и слово в родительном падеже если передать true
	const numAndWordFrom = document.querySelectorAll('.num_and_word-from');
	
	const declOfNum = (n, titles, from) => n + ' ' + titles[from ? n % 10 === 1 && n % 100 !== 11 ?
  1 : 2 : n % 10 === 1 && n % 100 !== 11 ?	0 :
  n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

	numAndWordFrom[0].textContent = 'От ' + declOfNum(49, arr, true);
	numAndWordFrom[1].textContent = 'От ' + declOfNum(53, arr, true);
	numAndWordFrom[2].textContent = 'От ' + declOfNum(71, arr, true);
}
*/




/*   ПЛАВНЫЙ СКРОЛЛ     https://codepen.io/Quper/pen/qBdqyQO?editors=0010    */

/*
const smothScroll = (trigger) => {
  const SPEED = 0.3;
  const scrolled = e => {
    e.preventDefault();
    const target = e.target;

    if (target.matches('[href^="#"]')) {
      let start = 0;
      const pageY = window.pageYOffset;
      const hash = target.getAttribute('href');

      if (hash === '#') return;

      const elem = document.querySelector(hash);
      const coordinateElem = elem.getBoundingClientRect().top;
      const allDistance = pageY + coordinateElem;
      const scroll = time => {
        if (!start) start = time;
        const progress = time - start;
        const r = (coordinateElem < 0 ?
          Math.max(pageY - progress / SPEED, allDistance) :
          Math.min(pageY + progress / SPEED, allDistance));

        window.scrollTo(0, r);

        const scrolling = coordinateElem < 0 ?
          r > allDistance :
          r < allDistance;
        if (scrolling) requestAnimationFrame(scroll);
      }
      requestAnimationFrame(scroll)
    }
  }
  trigger.addEventListener('click', scrolled);
}
smothScroll(document.querySelector('.list'))
smothScroll(document.querySelector('#up'))

*/