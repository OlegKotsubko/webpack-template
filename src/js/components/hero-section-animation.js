import { gsap } from 'gsap';

const heroSectionAnimation = () => {
  const timeline = gsap.timeline()
  const decor = document.querySelector('.js-herosection-decor');
  const title = document.querySelector('.js-herosection-title');
  const subtitle = document.querySelector('.js-herosection-subtitle');
  const button = document.querySelector('.js-herosection-button');
  const socials = document.querySelector('.js-herosection-socials');
  timeline
    .from(decor,{x: -24, rotateZ: 4, duration: 3}, 'key')
    .from(title,{opacity: 0, y: -24, duration: 0.3}, 'key+=0.4')
    .from(subtitle,{opacity: 0, y: -24, duration: 0.3}, 'key+=0.6')
    .from(button,{opacity: 0, y: -24, duration: 0.3}, 'key+=0.8')
    .from(socials,{opacity: 0, x: 24, duration: 0.3}, 'key+=1')
}

export default heroSectionAnimation
