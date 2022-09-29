import { gsap } from 'gsap';

const preloader = () => {
  const items = Array.from(document.querySelectorAll('.js-preloader-item'))
  const curtain = document.querySelector('.js-preloader-curtain')
  const logo = document.querySelector('.js-preloader-logo')
  const icon = logo.querySelector('.js-preloader-icon')

  const headerLogo = document.querySelector('.js-header-logo')
  const fromTop = headerLogo.offsetTop + 2

  const tl = gsap.timeline()

  tl
    .fromTo(items, {
      opacity: 0,
    },{
      opacity: 1,
      stagger: 0.6,
    })
    .fromTo(logo, {
      opacity: 0,
    },{
      opacity: 1,
      duration: 0.4
    })
    .set(items, {
      opacity: 0,
      zIndex: -1,
      duration: 0,
    })
    .set(logo, {
      background: 'transparent',
      duration: 0.4
    })
    .to(icon, {width: 134, marginLeft: 0, top: fromTop, duration: 0.6}, 'start')
    .to(icon, {opacity: 0, duration: 1}, 'start+=1')
    .to(curtain, {top: '-100%', duration: 1}, 'start')

  return {
    tl
  }
}

export default preloader
