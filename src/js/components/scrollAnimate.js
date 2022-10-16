import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const scrollAnimate = (tl) => {
  const main = document.querySelector('.main')
  const container = document.querySelector('.js-animated-section')
  const hero = document.getElementById('hero-section')
  const video = document.getElementById('video-section')
  const videoContent = document.getElementById('video-section-content')

  const t1 = hero.querySelector('.js-hero-section-title-first')
  const t2 = hero.querySelector('.js-hero-section-title-second')
  const t3 = hero.querySelector('.js-hero-section-title-third')
  const t4 = hero.querySelector('.js-hero-section-title-fourth')

  const button = document.querySelector('.js-video-section-cursor')

  ScrollTrigger.matchMedia({
    "(max-width: 1023px)": function () {
      t1.removeAttribute('style')
      t2.removeAttribute('style')
      t3.removeAttribute('style')
      t4.removeAttribute('style')
      container.removeAttribute('style')
      video.removeAttribute('style')
      videoContent.removeAttribute('style')
    },
    "(min-width: 1024px)": function () {
      tl
        .addLabel('start')
        .from(t1, {
        opacity: 0,
        x: 56,
        duration: 0.3,
      }, 'start-=0.2')
      .from(t2, {
        opacity: 0,
        x: -72,
        duration: 0.6,
      }, 'start')
      tl.from(t3, {
        opacity: 0,
        x: 120,
        duration: 1,
      }, 'start+=0.2')
      .from(t4, {
        opacity: 0,
        x: -100,
        duration: 1.1,
      }, 'start+=0.4')

      gsap.timeline({
        scrollTrigger: {
          trigger: main,
          start: "0% 0%",
          end: `+=${container.scrollWidth}`,
          scrub: .6,
          pin: true,
          onUpdate: () => {
            button.style.pointerEvents = 'none'
            setTimeout(() => {
              button.style.pointerEvents = 'all'
            }, 1)
          },
        }
      }).to(container, {
        xPercent: -100 * (container.children.length - 1),
        ease: "none"
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
        xPercent: -130,
        width: '40%',
        marginBottom: '15%',
      })
    }
  })
}

export default scrollAnimate
