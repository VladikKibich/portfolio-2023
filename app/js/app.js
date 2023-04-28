document.addEventListener('DOMContentLoaded', () => {


  const swiperTEXT = new Swiper(".swiper-text", {
    direction: 'horizontal',
    loop: true,
    speed: 1000,
    allowSlideNext: false,
    allowSlidePrev: false,
    allowMousewheel: false,
    grabCursor: false
  });

  const swiperIMG = new Swiper(".swiper-img", {
    effect: "cube",
    grabCursor: true,
    loop: true,
    speed: 1000,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    }
  });


  const swiperINFO = new Swiper(".swiper-info", {
    direction: 'horizontal',
    loop: true,
    speed: 1000,
    allowSlideNext: false,
    allowSlidePrev: false,
    allowMousewheel: false,
    grabCursor: false
  });

  swiperIMG.controller.control = ([swiperTEXT, swiperINFO]);

  let cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    let cardBg = card.querySelector('[data-card="bg"]');

    card.addEventListener("mouseover", () => {
      cardBg.classList.add("img-scale");
    });

    card.addEventListener("mouseout", () => {
      cardBg.classList.remove("img-scale");
    });
  });

  const swiperREVIEWS = new Swiper(".swiper-reviews", {
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination-reviews",
      clickable: true,
    },
  });

})
