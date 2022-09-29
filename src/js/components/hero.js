import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const hero = (tl) => {
  const hero = document.getElementById('hero-section')
  const video = document.getElementById('video-section')
  const contact = document.getElementById('contact-section')

  const t1 = hero.querySelector('.js-hero-section-title-first')
  const t2 = hero.querySelector('.js-hero-section-title-second')
  const t3 = hero.querySelector('.js-hero-section-title-third')
  const t4 = hero.querySelector('.js-hero-section-title-fourth')

  const videoWidth = video.offsetWidth

  ScrollTrigger.matchMedia({
    "(max-width: 1024px)": function () {
      console.log('mobile')
    },
    "(min-width: 1024px)": function () {
      tl.from(t1, {
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

      ScrollTrigger.create({
        trigger: document.body,
        start: "center center",
        end: "+=1500",
        markers:true,
        onUpdate: self => {
          const fixed = Number.parseFloat(self.progress).toFixed(2)

          if(fixed < 0.21) {
            contact.style.opacity = '0'
          } else {
            contact.style.opacity = '1'
          }

          gsap.to(video,{
            xPercent: -100 * (fixed * 2),
            width: Math.max(videoWidth, Number(fixed * 9000))
          })

          gsap.to(hero,{
            xPercent: -100 * (fixed * 4),
          })
        },
      });
    }
  })
}

export default hero
