import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const scrollAnimate = (tl) => {
  const main = document.querySelector('.main')
  const container = document.querySelector('.js-animated-section')
  const hero = document.getElementById('hero-section')
  const video = document.getElementById('video-section')
  const videoContent = document.getElementById('video-section-content')
  const playButton = document.querySelector('.js-video-section-cursor')

  const t1 = hero.querySelector('.js-hero-section-title-first')
  const t2 = hero.querySelector('.js-hero-section-title-second')
  const t3 = hero.querySelector('.js-hero-section-title-third')
  const t4 = hero.querySelector('.js-hero-section-title-fourth')

  ScrollTrigger.matchMedia({
    "(max-width: 1024px)": function () {
      console.log('mobile')
      t1.removeAttribute('style')
      t2.removeAttribute('style')
      t3.removeAttribute('style')
      t4.removeAttribute('style')
      container.removeAttribute('style')
      video.removeAttribute('style')
      videoContent.removeAttribute('style')
      playButton.classList.add('active')
    },
    "(min-width: 1024px)": function () {
      tl
        .from(t1, {
        opacity: 0,
        x: 24,
        duration: 0.3,
      }, 'start+=0.7')
      .from(t2, {
        opacity: 0,
        x: -24,
        duration: 0.6,
      }, 'start+=0.9')
      tl.from(t3, {
        opacity: 0,
        x: 148,
        duration: 1,
      }, 'start+=0.9')
      .from(t4, {
        opacity: 0,
        x: -100,
        duration: 1.1,
      }, 'start+=1.1')

      gsap.timeline({
        scrollTrigger: {
          trigger: main,
          start: "0% 0%",
          end: `+=${container.scrollWidth - window.innerWidth}`,
          scrub: 0,
          snap: {
            snapTo: 1 / 2,
            duration: { min: 0.22, max: 1 },
            delay: 0,
            ease: "sine.inOut"
          },
          pin: true,
        }
      }).to(container, {
        xPercent: -100 * (container.children.length - 1),
        ease: "none"
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: video,
          scrub: 0,
          start: `top top-=${video.offsetLeft - window.innerWidth}`,
          end: `+=${video.offsetWidth}`,
          onUpdate: (self) => {
            if(self.progress === 1) {
              playButton.classList.add('active')
            } else {
              playButton.classList.remove('active')
            }
          }
        }
      })
      .from(videoContent, {
        xPercent: -100,
        yPercent: -70,
        width: '40%',
      })
    }
  })
}

export default scrollAnimate
