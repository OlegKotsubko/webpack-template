import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)


const banner = () => {
  const banner = document.querySelector('.js-banner')
  const decorOne = document.querySelector('.js-banner-decor-one')
  const decorTwo = document.querySelector('.js-banner-decor-two')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: banner,
      start: `center bottom`,
      scrub: 2.5,
    },
  })

  tl.addLabel("start")
    .from(decorOne, { y: 50}, "start")
    .from(decorTwo, { y: 100}, "start")
}

export default banner
