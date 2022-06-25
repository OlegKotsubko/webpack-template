import Swiper from 'swiper/bundle';
import '../scss/app.scss'

const swiper = new Swiper('.swiper',{
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
