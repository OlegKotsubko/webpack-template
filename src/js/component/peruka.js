import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const peruka = () => {
  const logo = document.querySelector('.js-logo-section')
  const decor = document.querySelector('.js-logo-section-decor')

  ScrollTrigger.matchMedia({
    "(max-width: 1279px)": function () {
      logo.removeAttribute('style');
      decor.removeAttribute('style');
    },
    "(min-width: 1280px)": function () {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: logo,
          start: "center center",
          end: '+=500',
          scrub: true,
          pin: true,
        },
      })
      tl.to(decor, { x: '100%'})
    }
  })
}

export default peruka
