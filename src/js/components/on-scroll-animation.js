import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const onScrollAnimation = () => {
  ScrollTrigger.batch('.js-on-scroll-animation', {
    start: "top 100%",
    toggleClass: "active",
    once: true
  })
}

export default onScrollAnimation
