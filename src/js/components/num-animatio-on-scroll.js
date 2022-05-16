import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COUNT={ val:0 };
const DURATION = 1.5;

function numbersAnimation() {
  gsap.to(
    COUNT,
    DURATION, {
      val: 1000,
      roundProps: 'val',
      onUpdate(){
        document.querySelector('.js-number-animation').innerHTML = `${COUNT.val}+`
      }
    });
}

const numAnimationOnScroll = () => {
  ScrollTrigger.matchMedia({
    "(min-width: 640px)": function() {
      ScrollTrigger.batch('.js-number-animation', {
        start: "top 100%",
        stop: "top -100%",
        onEnter: numbersAnimation,
        once: true,
      })
    }
  })
}

export default numAnimationOnScroll;
