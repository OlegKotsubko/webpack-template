import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const hero = () => {
  const headerLogo = document.querySelector('.js-header-logo')
  const headerNav = document.querySelector('.js-header-nav')
  const heroTitle = document.querySelector('.js-hero-section-title')
  const heroButton = document.querySelector('.js-hero-section-button')
  const lineOne = document.querySelector('.js-hero-section-line-one')
  const lineOneWrapper = lineOne.querySelector('.js-line-wrapper')
  const lineTwo = document.querySelector('.js-hero-section-line-two')
  const lineTwoWrapper = lineTwo.querySelector('.js-line-wrapper')
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

  ScrollTrigger.matchMedia({
    "(max-width: 1279px)": function () {
      lineOneWrapper.removeAttribute('style');
      lineTwoWrapper.removeAttribute('style');
    },
    "(min-width: 1280px)": function () {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top center",
          scrub: 2.5
        },
      })

      tl.addLabel("start")
        .to(lineOneWrapper, { x: '2%', duration: 3 }, "start")
        .to(lineTwoWrapper, { x: '-2%', duration: 3 }, "start")
    }
  })
}

export default hero
