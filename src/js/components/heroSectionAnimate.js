import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const heroSectionAnimate = (tl) => {
  const hero = document.getElementById('hero-section')
  const t1 = hero.querySelector('.js-hero-section-title-first')
  const t2 = hero.querySelector('.js-hero-section-title-second')
  const t3 = hero.querySelector('.js-hero-section-title-third')
  const t4 = hero.querySelector('.js-hero-section-title-fourth')

  ScrollTrigger.matchMedia({
    "(max-width: 1023px)": function () {
      t1.removeAttribute('style')
      t2.removeAttribute('style')
      t3.removeAttribute('style')
      t4.removeAttribute('style')
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
        .from(t3, {
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
          trigger: hero,
          scrub: 0.8,
          start: `top top`,
          end: `+=${hero.offsetWidth}`,
        }
      }).addLabel('start')
        .to(t1, {
          xPercent: -80,
        }, 'start')
        .to(t2, {
          xPercent: -30,
        }, 'start')
        .to(t3, {
          xPercent: -60,
        }, 'start')
        .to(t4, {
          xPercent: -90,
        }, 'start')
    }
  })
}

export default heroSectionAnimate
