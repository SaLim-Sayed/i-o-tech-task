import { A11y, Navigation } from "swiper/modules";

export const REVIEWS_SWIPER_CONFIG = {
  modules: [Navigation, A11y],
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".reviews-swiper-button-next",
    prevEl: ".reviews-swiper-button-prev",
  },
  loop: true,
  speed: 800,
};
