import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const scrollAnimate = () => {
  const main = document.querySelector('.main')
  const container = document.querySelector('.js-animated-section')
  const video = document.getElementById('video-section')
  const videoContent = document.getElementById('video-section-content')

  ScrollTrigger.matchMedia({
    "(max-width: 1023px)": function () {
      container.removeAttribute('style')
      video.removeAttribute('style')
      videoContent.removeAttribute('style')
    },
    "(min-width: 1024px)": function () {
      gsap.timeline({
        scrollTrigger: {
          start: "0% 0%",
          end: `+=${container.scrollWidth}`,
          scrub: true,
          pin: main,
        }
      }).to(container, {
        xPercent: -100 * (container.children.length - 1),
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: video,
          scrub: true,
          start: `top top-=${video.offsetLeft - window.innerWidth}`,
          end: `+=${video.offsetWidth}`,
        }
      })
      .from(videoContent, {
        xPercent: -100,
        width: '45%',
        yPercent: -7,
      })
    }
  })
}

export default scrollAnimate
