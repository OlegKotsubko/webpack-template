import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const peruka = () => {
  const logo = document.querySelector('.js-logo-section')
  const decor = document.querySelector('.js-logo-section-decor')

  ScrollTrigger.matchMedia({
    "(max-width: 767px)": function () {
      logo.removeAttribute('style');
      decor.removeAttribute('style');
    },
    "(min-width: 768px)": function () {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: logo,
          start: "center center",
          end: '+=1000',
          scrub: 1.5,
          pin: true,
        },
      })

      tl.to(decor, { x: '200%' })
    }
  })
}

export default peruka
