import $ from 'jquery';
import 'slick-slider';

const slider = () => {
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: true,
    infinite: true,
    asNavFor: '.slider-nav',
    prevArrow: $('.prev'),
    nextArrow: $('.next')
  });

  $('.slider-nav').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    infinite: true,
    arrows: false,
    centerMode: true,
    focusOnSelect: false
  });

}

export default slider;

