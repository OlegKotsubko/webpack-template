import { gsap } from 'gsap';

const preloader = () => {
  const items = Array.from(document.querySelectorAll('.js-preloader-item'))
  const curtain = document.querySelector('.js-preloader-curtain')
  const logo = document.querySelector('.js-preloader-logo')
  const icon = logo.querySelector('.js-preloader-icon')
  const chars = icon.querySelectorAll('svg path')

  const headerLogo = document.querySelector('.js-header-logo')
  const fromTop = headerLogo.offsetTop + 2

  const tl = gsap.timeline()

  tl
    .addLabel('start')
    .from(items, {
      opacity: 0,
      stagger: 0.6,
    })
    .to(items, {
      opacity: 0,
      zIndex: -1,
      duration: 0,
    })
    .from(chars, {
      opacity: 0,
      stagger: 0.08,
    })
    .to(icon, {width: 134, marginLeft: 0, top: fromTop, duration: 0.6})
    .to(curtain, {top: '-100%', duration: 0.6})
    .set(logo, {visibility: 'hidden'})
    .add(() => {
      document.body.classList.remove('overflow-is-hidden')
    })

  return {
    tl
  }
}

export default preloader
