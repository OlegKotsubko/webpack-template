import Swiper, { Navigation, Pagination } from 'swiper';

const slider = () => {
  const sliders = document.querySelectorAll('.slider')

  try {
    sliders.forEach(slider => {
      new Swiper(slider.querySelector('.swiper'), {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        pagination: {
          el: slider.querySelector('.swiper-pagination'),
          clickable: true,
        },
        navigation: {
          nextEl: slider.querySelector('.swiper-button-next'),
          prevEl: slider.querySelector('.swiper-button-prev'),
        },
        breakpoints: {
          768: {
            spaceBetween: 127,
            slidesPerView: 2,
          },
          1280: {
            spaceBetween: 73,
            slidesPerView: 3,
          },
        },
      });
    })
  } catch (err) {
    console.warn(err)
  }

}


export default slider;
