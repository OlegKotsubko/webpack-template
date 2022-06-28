import $ from 'jquery';
import 'slick-slider';
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const slider = () => {
  const section = document.querySelector('.js-slider-section');
  const lineWrapper = section.querySelector('.js-line-wrapper');

  ScrollTrigger.matchMedia({
    "(max-width: 1279px)": function () {
      lineWrapper.removeAttribute('style');
    },
    "(min-width: 1280px)": function () {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `bottom center`,
          end: `+=300%`,
          scrub: 1.5,
        },
      })

      tl.to(lineWrapper, { x: '-9%', duration: 3 })
    }
  })


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

