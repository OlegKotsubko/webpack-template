import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const hero = () => {
  const headerLogo = document.querySelector('.js-header-logo')
  const headerNav = document.querySelector('.js-header-nav')
  const heroTitle = document.querySelector('.js-hero-section-title')
  const heroButton = document.querySelector('.js-hero-section-button')
  const heroLink = document.querySelector('.js-hero-section-link')
  const lineOne = document.querySelector('.js-hero-section-line-one')
  const lineOneWrapper = lineOne.querySelector('.line__wrapper')
  const lineTwo = document.querySelector('.js-hero-section-line-two')
  const lineTwoWrapper = lineTwo.querySelector('.line__wrapper')
  const heroSection = document.querySelector('.js-hero-section')

  gsap
    .timeline()
    .from(headerLogo, {
      opacity: 0,
      y: -24,
      duration: 1.3
    }, 'key')
    .from(headerNav.children, {
      opacity: 0,
      y: -24,
      stagger: 0.1
    }, 'key+=0.3')
    .from(heroTitle, {
      opacity: 0,
      y: -24,
      duration: 0.3
    }, 'key+=0.6')
    .from(heroButton, {
      opacity: 0,
      y: -24,
      duration: 0.3
    }, 'key+=0.6')
    .from(heroLink, {
      opacity: 0,
      x: 24,
      duration: 0.3
    }, 'key+=0.8')
    .from(lineOne, {
      opacity: 0,
      y: 24,
      duration: 1.3
    }, 'key+=0.6')
    .from(lineTwo, {
      opacity: 0,
      y: 24,
      duration: 1.3
    }, 'key+=0.8')

  ScrollTrigger.matchMedia({
    "(max-width: 767px)": function () {
      lineOneWrapper.removeAttribute('style');
      lineTwoWrapper.removeAttribute('style');
    },
    "(min-width: 768px)": function () {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top=-100%",
          scrub: 2.5
        },
      })

      tl
        .to(lineOneWrapper, { x: '2%', duration: 3 })
        .to(lineTwoWrapper, { x: '2%', duration: 3 })
    }
  })
}

export default hero
