import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const info = () => {
  const info = document.querySelector('.js-info-section')
  const masks = Array.from(document.querySelectorAll('.js-info-section-mask'))

  function clearMasks() {
    masks.forEach(mask => mask.style.opacity = '0')
  }

  ScrollTrigger.matchMedia({
    "(max-width: 767px)": function () {
      info.removeAttribute('style');
    },
    "(min-width: 768px)": function () {
      ScrollTrigger.create({
        trigger: info,
        pin: true,
        start: "center center",
        end: "+=1500",
        onUpdate: self => {
          clearMasks()
          if(self.progress < 0.3) {
            masks[0].style.opacity = '1'
          } else if(self.progress > 0.3 && self.progress < 0.6) {
            masks[1].style.opacity = '1'
          } else {
            masks[2].style.opacity = '1'
          }
        },
      });
    }
  })
}

export default info
